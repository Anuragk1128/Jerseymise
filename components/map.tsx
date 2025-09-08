"use client"

import { useState } from 'react'
import { Location } from '@/types'

interface InteractiveMapProps {
  locations: Location[]
}

export default function InteractiveMap({ locations }: InteractiveMapProps) {
    const [selectedLocation, setSelectedLocation] = useState(locations[0])

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
                {/* Map Placeholder */}
                <div className="md:w-2/3 h-64 md:h-96 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                        <div className="text-center">
                            <div className="text-2xl mb-2">🗺️</div>
                            <p>Interactive Map</p>
                            <p className="text-sm">Showing: {selectedLocation.name}</p>
                        </div>
                    </div>
                </div>
                
                {/* Location List */}
                <div className="md:w-1/3 p-4">
                    <h3 className="font-semibold mb-4">Select Location:</h3>
                    <div className="space-y-2">
                        {locations.map(location => (
                            <button
                                key={location.id}
                                onClick={() => setSelectedLocation(location)}
                                className={`w-full text-left p-3 rounded border transition duration-200 ${
                                    selectedLocation.id === location.id
                                        ? 'bg-blue-100 border-blue-300'
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                <div className="font-medium">{location.name}</div>
                                <div className="text-sm text-gray-600">{location.address}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
