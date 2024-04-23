import React, { createContext, useContext, useState } from 'react'

const MapContext = createContext()

export const useMapContext = () => useContext(MapContext)

export const MapProvider = ({ children }) => {
  const [mapPosition, setMapPosition] = useState({
    lat: 0,
    lng: 0,
    details: null,
  })

  const updateMapPosition = (lat, lng, details) => {
    setMapPosition({ lat, lng, details })
  }

  return (
    <MapContext.Provider value={{ mapPosition, updateMapPosition }}>
      {children}
    </MapContext.Provider>
  )
}
