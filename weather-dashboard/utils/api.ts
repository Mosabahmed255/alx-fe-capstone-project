const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getWeatherData(query: string) {
    try {
    let url = ''
    if (query.includes('lat')) {
        url = `${BASE_URL}/weather?${query}&units=metric&appid=${API_KEY}`
    } else {
        const city = query.split('=')[1]
        url = `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    }
    
    const [weatherRes, forecastRes] = await Promise.all([
        fetch(url),
        fetch(`${BASE_URL}/forecast?${query}&units=metric&appid=${API_KEY}`)
    ])

    if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('Failed to fetch weather data')
    }

    const [weather, forecast] = await Promise.all([
        weatherRes.json(),
        forecastRes.json()
    ])

    return { weather, forecast }
    } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch weather data')
    }
}