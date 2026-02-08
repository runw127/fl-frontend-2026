const fixPath = require('fix-path');

fixPath();

const { app, BrowserWindow, shell } = require('electron');
if (app && typeof app.setName === 'function') {
  try {
    app.setName('BloodCounts!');
  } catch (e) {}
}
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');


// Determine if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow;
let nextServer = null;
const PORT = 3000;

// Get the app path - where the app files are located
function getAppPath() {
  if (app.isPackaged) {
    // In production, files are in resources/app (asar disabled)
    return path.join(process.resourcesPath, 'app');
  }
  return path.join(__dirname, '..');
}

// Check if port is available
function waitForServer(port, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const checkServer = () => {
      attempts++;

      const req = http.get(`http://localhost:${port}`, (res) => {
        resolve();
      });

      req.on('error', () => {
        if (attempts >= maxAttempts) {
          reject(new Error(`Server not ready after ${maxAttempts} attempts`));
        } else {
          setTimeout(checkServer, 1000);
        }
      });

      req.end();
    };

    // Initial delay before first check
    setTimeout(checkServer, 1000);
  });
}

// Start the Next.js standalone server in production
function startNextServer() {
  return new Promise((resolve, reject) => {
    const appPath = getAppPath();
    const fs = require('fs');

    // The standalone server is at .next/standalone/server.js
    const serverPath = path.join(appPath, '.next', 'standalone', 'server.js');

    console.log('Starting Next.js standalone server...');
    console.log('App path:', appPath);
    console.log('Server path:', serverPath);

    // Load environment variables from .env.local if it exists
    let envVars = { ...process.env };
    const envPath = path.join(appPath, '.env.local');

    try {
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const eqIndex = trimmed.indexOf('=');
            if (eqIndex > 0) {
              const key = trimmed.substring(0, eqIndex).trim();
              const value = trimmed.substring(eqIndex + 1).trim();
              envVars[key] = value;
            }
          }
        });
        console.log('Loaded environment from .env.local');
      }
    } catch (e) {
      console.log('Could not load .env.local:', e.message);
    }

    // Ensure NEXTAUTH_SECRET is set (NextAuth uses this in production)
    if (envVars.AUTH_SECRET && !envVars.NEXTAUTH_SECRET) {
      envVars.NEXTAUTH_SECRET = envVars.AUTH_SECRET;
    }

    // Try multiple node paths
    const nodePaths = [
      '/usr/local/bin/node',
      '/opt/homebrew/bin/node',
      '/usr/bin/node',
      'node'
    ];

    // Find first available node
    const { execSync } = require('child_process');
    let nodeExec = 'node';
    for (const np of nodePaths) {
      try {
        execSync(`${np} --version`, { stdio: 'ignore' });
        nodeExec = np;
        break;
      } catch (e) {
        continue;
      }
    }

    console.log('Using Node.js:', nodeExec);

    nextServer = spawn(nodeExec, [serverPath], {
      cwd: path.join(appPath, '.next', 'standalone'),
      env: {
        ...envVars,
        NODE_ENV: 'production',
        PORT: PORT.toString(),
        HOSTNAME: 'localhost',
        NEXTAUTH_URL: `http://localhost:${PORT}`
      },
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false
    });

    nextServer.stdout.on('data', (data) => {
      console.log('Next.js:', data.toString().trim());
    });

    nextServer.stderr.on('data', (data) => {
      console.error('Next.js error:', data.toString().trim());
    });

    nextServer.on('error', (error) => {
      console.error('Failed to start Next.js server:', error);
      reject(error);
    });

    nextServer.on('close', (code) => {
      console.log('Next.js server exited with code:', code);
      nextServer = null;
    });

    // Wait for the server to be ready by polling
    waitForServer(PORT)
      .then(() => {
        console.log('Next.js server is ready!');
        resolve();
      })
      .catch(reject);
  });
}

// Stop the Next.js server
function stopNextServer() {
  if (nextServer) {
    console.log('Stopping Next.js server...');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', nextServer.pid, '/f', '/t']);
    } else {
      nextServer.kill('SIGTERM');
    }
    nextServer = null;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    icon: path.join(__dirname, '../public/images/logo/512.png'),
    titleBarStyle: 'default',
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (!url.includes('localhost')) {
        shell.openExternal(url);
        return { action: 'deny' };
      }
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopNextServer();
    app.quit();
  }
});

app.on('before-quit', () => {
  stopNextServer();
});

app.whenReady().then(async () => {
  if (isDev) {
    createWindow();
  } else {
    try {
      await startNextServer();
      createWindow();
    } catch (error) {
      console.error('Failed to start Next.js server:', error);
      app.quit();
    }
  }
});

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (!parsedUrl.origin.includes('localhost')) {
      event.preventDefault();
    }
  });
});
