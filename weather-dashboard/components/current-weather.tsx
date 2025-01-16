'use client'

import { Card } from '../components/ui/card'
import { WeatherData } from '../types/weather'
import { Cloud, CloudRain, Sun } from 'lucide-react'

interface CurrentWeatherProps {
    data: WeatherData
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
    return (
    <Card className="bg-white dark:bg-sky-100/10 p-6 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm">
        <div className="flex flex-col">
        <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-muted-foreground">Friday</div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">11:45 AM</div>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <div>
            <div className="text-6xl font-bold">{Math.round(data.main.temp)}°</div>
            <div className="mt-1 text-sm text-gray-600 dark:text-muted-foreground">
                Wind N {Math.round(data.wind.speed)} km/h
            </div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">
                Pressure {data.main.pressure}MB
            </div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">
                Humidity {data.main.humidity}%
            </div>
            </div>
            <div className="text-amber-400">
            <Sun className="h-16 w-16" />
            </div>
        </div>
        </div>
    </Card>
  )
}

