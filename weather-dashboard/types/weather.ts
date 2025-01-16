export interface WeatherData {
    main: {
    temp: number
    humidity: number
    pressure: number
    }
    weather: Array<{
    main: string
    description: string
    icon: string
    }>
    wind: {
    speed: number
    deg: number
    }
    visibility: number
    name: string
    sys: {
    sunrise: number
    sunset: number
    }
}

export interface ForecastData {
    list: Array<{
    dt: number
    main: {
        temp: number
    }
    weather: Array<{
        main: string
        icon: string
    }>
    }>
}

export interface CityData {
    name: string
    country: string
    weather: string
    temp: number
}

