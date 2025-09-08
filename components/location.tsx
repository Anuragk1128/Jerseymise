"use client"

import { useState } from 'react'
import { Location } from '@/types'

interface LocationCardProps {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            </div>
            
            <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{location.address}</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">📞</span>
                    <span>{location.phone}</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">🕐</span>
                    <span>{location.hours}</span>
                </div>
            </div>
            
            {showDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md animate-fade-in">
                    <p className="text-sm text-gray-600 mb-3">
                        Additional information about this location...
                    </p>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-200">
                            Get Directions
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition duration-200">
                            Call Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
