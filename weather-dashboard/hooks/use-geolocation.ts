'use client'

import { useState } from 'react'

interface GeolocationState {
    latitude: number | null
    longitude: number | null
    error: string | null
    loading: boolean
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
    })

    const getLocation = async () => {
    if (!navigator.geolocation) {
        setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
        }))
        return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        })
        })

        setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
        })
    } catch (error) {
        let message = 'Failed to get location'
        if (error instanceof GeolocationPositionError) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
            message = 'Please allow location access to use this feature'
            break
            case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable'
            break
            case error.TIMEOUT:
            message = 'Location request timed out'
            break
        }
        }
        setState({
        latitude: null,
        longitude: null,
        error: message,
        loading: false,
        })
    }
    }

    return { ...state, getLocation }
}

