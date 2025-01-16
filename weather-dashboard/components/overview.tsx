'use client'

import { Card } from '@/components/ui/card'
import { WeatherData } from '../types/weather'

interface OverviewProps {
    data: WeatherData
}

export function Overview({ data }: OverviewProps) {
    return (
    <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Wind Status</h3>
        <div className="mt-2">
            <div className="text-3xl font-bold">{data.wind.speed}</div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">km/h</div>
        </div>
        <div className="mt-4 h-24">
          {/* Wind graph bars */}
            <div className="flex h-full items-end space-x-1">
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                key={i}
                className="w-2 bg-blue-500/60 rounded-full"
                style={{
                  height: `${Math.random() * 100}%`,
                }}
                />
            ))}
            </div>
        </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">UV Index</h3>
        <div className="mt-6">
            <div className="relative h-32">
            <div className="absolute inset-0">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500" />
            </div>
            <div className="absolute bottom-0 left-1/2 h-1/2 w-1 -translate-x-1/2 transform bg-white" />
            </div>
            <div className="mt-4 text-center text-3xl font-bold">5.50</div>
        </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Humidity</h3>
        <div className="mt-4">
            <div className="text-3xl font-bold">{data.main.humidity}%</div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">
            The dew point is 27° right now
            </div>
        </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-transparent shadow-sm">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Visibility</h3>
        <div className="mt-4">
            <div className="text-3xl font-bold">{(data.visibility / 1000).toFixed(1)}</div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">km</div>
            <div className="text-sm text-gray-600 dark:text-muted-foreground">
            This is affecting visibility
            </div>
        </div>
        </Card>
    </div>
    )
}

