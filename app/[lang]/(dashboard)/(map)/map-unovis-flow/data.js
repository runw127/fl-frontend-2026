export const points = [
    { name: "Barts", full_name: "Barts Health", user: 32900, country: "gb", lat: 51.5175, lon: -0.1026 },
    { name: "UCLH", full_name: "UCL Hospitals", user: 30456, country: "gb", lat: 51.525, lon: -0.1357 },
    { name: "AUMC", full_name: "Amsterdam UMC", user: 29703, country: "nl", lat: 52.3676, lon: 4.9041 },
    { name: "CUH", full_name: "Cambridge University Hospitals", user: 27533, country: "gb", lat: 52.205337, lon: 0.121817 },
    { name: "APOLLO", full_name: "Apollo Hospitals", user: 27523, country: "in", lat: 28.6139, lon: 77.209 },
    { name: "MRCG", full_name: "MRC Gambia", user: 23289, country: "gm", lat: 13.4549, lon: -16.579 }
]

export const connections = [
    ['Barts', 'CUH'],
    ['UCLH', 'CUH'],
    ['AUMC', 'CUH'],
    ['APOLLO', 'CUH'],
    ['MRCG', 'CUH'],
]

export const flows = connections.map(c => {
    const sourcePoint = points.find(d => d.name === c[0])
    const targetPoint = points.find(d => d.name === c[1])
    return {
        sourceLat: sourcePoint.lat,
        sourceLon: sourcePoint.lon,
        targetLat: targetPoint.lat,
        targetLon: targetPoint.lon,
        particleDensity: 0.8 + Math.random() / 5,
    }
})

export const data = { points, flows }
