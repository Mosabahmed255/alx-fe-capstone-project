'use client'

import { Card } from '@/components/ui/card'
import { Cloud, CloudRain, Sun } from 'lucide-react'
import { CityData } from '../types/weather'

const cities: CityData[] = [
    { name: 'Beijing', country: 'China', weather: 'Cloudy', temp: 20 },
    { name: 'California', country: 'US', weather: 'Windy', temp: 25 },
    { name: 'Arab Emirates', country: 'Dubai', weather: 'Mostly Sunny', temp: 32 },
    { name: 'Charlottetown', country: 'Canada', weather: 'Light Snowshower', temp: -2 },
]

export function OtherCities() {
    return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Other Cities</h2>
        <button className="text-sm text-primary hover:text-primary/80">See All</button>
        </div>
        <div className="space-y-4">
        {cities.map((city) => (
            <Card key={city.name} className="bg-white dark:bg-gray-900/50 p-4 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{city.name}</h3>
                <p className="text-sm text-gray-600 dark:text-muted-foreground">{city.weather}</p>
                </div>
                <div className="flex items-center gap-2">
                <Cloud className="h-6 w-6 text-gray-400" />
                <span className="text-lg font-semibold">{city.temp}°</span>
                </div>
            </div>
            </Card>
        ))}
        </div>
    </div>
    )
}

