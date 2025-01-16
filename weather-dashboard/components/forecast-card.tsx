'use client'

import { Card, CardContent } from '../components/ui/card'
import { ForecastData } from '../types/weather'

interface ForecastCardProps {
    data: ForecastData
}

export function ForecastCard({ data }: ForecastCardProps) {
  // Get one forecast per day
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5)

    return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {dailyForecasts.map((forecast) => (
        <Card key={forecast.dt} className="bg-card/50 backdrop-blur">
            <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              {new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                })}
            </p>
            <div className="my-2">
                <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].main}
                className="mx-auto h-10 w-10"
                />
            </div>
            <p className="text-center text-xl font-bold">
                {Math.round(forecast.main.temp)}°
            </p>
            </CardContent>
        </Card>
        ))}
    </div>
    )
}

