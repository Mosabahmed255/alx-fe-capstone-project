'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { CurrentWeather } from '@/components/current-weather'
import { Forecast } from '@/components/forecast'
import { Overview } from '@/components/overview'
import { OtherCities } from '@/components/other-cities'
import { getWeatherData } from '@/utils/api'
import { WeatherData, ForecastData } from '@/types/weather'
import { ThemeProvider } from '@/providers/theme-provider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'sonner'

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLocationWeather(lat: number, lon: number) {
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherData(`lat=${lat}&lon=${lon}`)
      setWeather(data.weather)
      setForecast(data.forecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(city: string) {
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherData(`city=${encodeURIComponent(city)}`)
      setWeather(data.weather)
      setForecast(data.forecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-[#1B1D1F] text-gray-900 dark:text-white">
        <Header 
          onSearch={handleSearch} 
          onLocationSearch={handleLocationWeather}
          weather={weather}
        />
        
        <div className="mx-auto max-w-7xl p-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {weather && forecast && !loading && (
            <div className="grid grid-cols-[1fr_300px] gap-6">
              <div className="space-y-6">
                <div className="grid grid-cols-[300px_1fr] gap-6">
                  <CurrentWeather data={weather} />
                  <Forecast data={forecast} />
                </div>
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Today&apos;s Overview</h2>
                  <Overview data={weather} />
                </div>
              </div>
              <OtherCities />
            </div>
          )}
        </div>
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  )
}

