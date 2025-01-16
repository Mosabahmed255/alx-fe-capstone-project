import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function GET(request: Request) {
    try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (!city && (!lat || !lon)) {
        return NextResponse.json(
        { error: 'City or coordinates are required' },
        { status: 400 }
        )
    }

    if (!API_KEY) {
        return NextResponse.json(
        { error: 'API key is not configured' },
        { status: 500 }
        )
    }

    let queryString = ''
    if (city) {
        queryString = `q=${encodeURIComponent(city)}`
    } else {
        queryString = `lat=${lat}&lon=${lon}`
    }

    const [weatherRes, forecastRes] = await Promise.all([
        fetch(
        `${BASE_URL}/weather?${queryString}&units=metric&appid=${API_KEY}`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
        ),
        fetch(
        `${BASE_URL}/forecast?${queryString}&units=metric&appid=${API_KEY}`,
        { next: { revalidate: 300 } }
        )
    ])

    if (!weatherRes.ok || !forecastRes.ok) {
        const errorData = await weatherRes.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to fetch weather data')
    }

    const [weather, forecast] = await Promise.all([
        weatherRes.json(),
        forecastRes.json()
    ])

    return NextResponse.json({ weather, forecast })
    } catch (error) {
    console.error('Weather API Error:', error)
    return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: 500 }
    )
    }
}

