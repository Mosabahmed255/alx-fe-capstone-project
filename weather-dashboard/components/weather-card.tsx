'use client'

import { Card, CardContent } from '../components/ui/card'
import { WeatherData } from '../types/weather'
import Image from 'next/image'

interface WeatherCardProps {
    data: WeatherData
}

export function WeatherCard({ data }: WeatherCardProps) {
    return (
    <Card className="bg-card/50 backdrop-blur">
        <CardContent className="p-6">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p className="text-6xl font-bold">
                {Math.round(data.main.temp)}°
            </p>
            <p className="text-muted-foreground">
                {data.weather[0].description}
            </p>
            </div>
            <Image
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                width={64}
                height={64}
                className="h-16 w-16"
            />
            <p className="text-sm text-muted-foreground">
                Humidity: {data.main.humidity}%
            </p>
            <p className="text-sm text-muted-foreground">
                Wind: {Math.round(data.wind.speed)} km/h
            </p>
            </div>
        </CardContent>
    </Card>
    )
}

