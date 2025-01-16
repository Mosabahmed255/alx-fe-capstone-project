'use client'

import { Card } from '@/components/ui/card'
import { ForecastData } from '../types/weather'
import { Cloud, CloudRain, Sun } from 'lucide-react'

interface ForecastProps {
    data: ForecastData
}

export function Forecast({ data }: ForecastProps) {
    const days = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']
    
    return (
    <div className="grid grid-cols-6 gap-4">
        {days.map((day, index) => (
        <Card key={day} className="bg-white dark:bg-gray-900/50 p-4 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm">
            <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 dark:text-muted-foreground">{day}</span>
            <div className="my-2">
                {index % 2 === 0 ? (
                <Cloud className="h-8 w-8 text-gray-400" />
                ) : (
                <CloudRain className="h-8 w-8 text-blue-400" />
                )}
            </div>
            <span className="text-xl font-bold">
                {Math.round(data.list[index].main.temp)}°
            </span>
            </div>
        </Card>
        ))}
    </div>
    )
}

