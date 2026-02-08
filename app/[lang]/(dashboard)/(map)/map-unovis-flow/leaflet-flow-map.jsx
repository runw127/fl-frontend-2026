"use client"
import { useCallback } from 'react'
import { VisLeafletFlowMap } from '@unovis/react'
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { data } from './data'

const LeafletFlowMap = () => {

    const { theme: config, setTheme: setConfig } = useThemeStore();
    const { theme: mode } = useTheme();
    const theme = themes.find((theme) => theme.name === config);

    const mapKey = "lKcAithx6fecm1IrCDDJ";
    const style = `https://api.maptiler.com/maps/7baa0159-0b50-43a1-82e1-195b5886ae73/style.json?key=lKcAithx6fecm1IrCDDJ`;
  

    const pointLatitude = useCallback((d) => d.lat, []);
    const pointLongitude = useCallback((d) => d.lon, []);
    const pointBottomLabel = useCallback((d) => d.id, []);

    const sourceLatitude = useCallback((d) => d.sourceLat, []);
    const sourceLongitude = useCallback((d) => d.sourceLon, []);
    const targetLatitude = useCallback((d) => d.targetLat, []);
    const targetLongitude = useCallback((d) => d.targetLon, []);
    const flowParticleDensity = useCallback((d) => d.particleDensity, []);

    const pointColor = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`;

    return (
        <div className='w-full h-[350px] overflow-hidden relative'>
            <VisLeafletFlowMap
                data={data}
                style={style}
                fitViewPadding={[20, 20]}
                pointLatitude={pointLatitude}
                pointLongitude={pointLongitude}
                pointBottomLabel={pointBottomLabel}
                sourceLatitude={sourceLatitude}
                sourceLongitude={sourceLongitude}
                targetLatitude={targetLatitude}
                targetLongitude={targetLongitude}
                flowParticleDensity={flowParticleDensity}
                flowParticleRadius={1.0}
                flowParticleColor={pointColor}
                pointColor={pointColor}
                pointRadius={3}
            ></VisLeafletFlowMap>
        </div>
    )
}

export default LeafletFlowMap;