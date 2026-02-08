import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import world from "../../../(map)/maps-vector/worldmap.json";
import { VectorMap } from "@south-paw/react-vector-maps";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  max-height: 500px;
  svg {
    path {
      fill: #ccc;
      cursor: default;
      outline: none;
      &[aria-checked='true'] {
        fill: #005eb8;
      }
      &[aria-current='true'] {
        fill: #ff6b6b;
      }
    }
  }
`;

const CountryMap = () => {
  const hospitals = [
    { name: "Barts", full_name: "Barts Health", user: "60k", country: "gb" },
    { name: "UCLH", full_name: "UCL Hospitals", user: "70k",  country: "gb" },
    { name: "AUMC", full_name: "Amsterdam UMC", user: "80k", country: "nl" },
    { name: "CUH", full_name: "Cambridge University Hospitals", user: "60k", country: "gb" },
    { name: "APOLLO", full_name: "Apollo Hospitals", user: "70k", country: "in" },
    { name: "MRCG", full_name: "MRC Gambia", user: "32k", country: "gm" },
    { name: "WACCBIP", full_name: "WACCBIP", user: "51k", country: "gh" },
    { name: "KUL", full_name: "KUZ Leuven", user: "82k", country: "be" },
    { name: "MUMC", full_name: "MUMC", user: "65k", country: "nl" },
    { name: "ZMC", full_name: "Zuyderland MC", user: "62k", country: "nl" },
    { name: "HSA", full_name: "Health Services Authority Singapore", user: "66k", country: "sg" },
    { name: "SANBS", full_name: "South African National Blood Service", user: "62k", country: "za" }
  ];

  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitalCountries = useMemo(() => 
    hospitals.map(h => h.country.toLowerCase()),
    [hospitals]
  );

  return (
    <div className="grid grid-cols-12 sm:gap-6 gap-4">
      <div className="col-span-12 md:col-span-8">
        <MapContainer>
          <VectorMap
            {...world}
            checkedLayers={hospitalCountries}
            currentLayers={selectedHospital ? [selectedHospital.country] : []}
            viewBox="400 150 550 420" // Zoomed in to focus on Asia, Europe, and Africa
          />
        </MapContainer>
      </div>
      <div className="col-span-12 md:col-span-4 mt-9 md:mt-0">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="text-base font-semibold text-default-900">
            Sample Size
          </div>
        </div>
        <div className="py-5">
          {hospitals.map((hospital, i) => (
            <div
              key={i}
              className="flex justify-between items-center pb-3.5 cursor-pointer"
              onMouseEnter={() => setSelectedHospital(hospital)}
              onMouseLeave={() => setSelectedHospital(null)}
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="50" height="50">
                  <circle cx="100" cy="100" r="90" stroke="#005eb8" strokeWidth="10" fill="#005eb8" />
                  <text x="50%" y="55%" textAnchor="middle" fontFamily="Arial" fontSize="40" fontStyle="italic" fontWeight="bold" fill="#ffffff">
                    {hospital.name}
                  </text>
                </svg>
                <span className="block text-default-600 text-sm font-medium text-left">
                  {hospital.full_name}
                </span>
              </div>
              <div className="text-sm text-default-600 bg-default-100 dark:bg-default-50 py-1.5 px-1.5 rounded">
                {hospital.user}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryMap;
