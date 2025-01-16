'use client'

import { Bell, Loader2, MapPin, Moon, Search, Sun, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RecentSearches } from './recent-searches'
import { useTheme } from '@/providers/theme-provider'
import { useState } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useGeolocation } from '@/hooks/use-geolocation'
import { toast } from 'sonner'

interface WeatherData {
    name: string;
  // Add other weather data properties as needed
}

interface HeaderProps {
    onSearch: (city: string) => void
    onLocationSearch: (lat: number, lon: number) => void
    weather?: WeatherData | null
}

export function Header({ onSearch, onLocationSearch, weather }: HeaderProps) {
    const { theme, toggleTheme } = useTheme()
    const [showRecent, setShowRecent] = useState(false)
    const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    'recent-searches',
    []
    )
    const { getLocation, loading, latitude, longitude, error } = useGeolocation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const city = formData.get('city') as string
    if (city.trim()) {
        onSearch(city)
        setRecentSearches(prev => {
        const searches = prev.filter(s => s !== city)
        return [city, ...searches].slice(0, 5)
        })
    }
    }

    const handleLocationClick = async () => {
    await getLocation()
    if (latitude && longitude) {
        onLocationSearch(latitude, longitude)
    } else if (error) {
        toast.error(error)
    }
    }

    const handleRecentSelect = (city: string) => {
    onSearch(city)
    setShowRecent(false)
    }

    const clearRecentSearches = () => {
    setRecentSearches([])
    }

    return (
    <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <span className="text-lg font-medium">{weather?.name || 'Select Location'}</span>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-4 relative">
        <div className="relative flex gap-2">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                name="city"
                placeholder="Search City"
                className="w-full bg-white/50 dark:bg-background/50 pl-10 border border-gray-200 dark:border-transparent"
                onFocus={() => setShowRecent(true)}
                onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            />
            </div>
            <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleLocationClick}
            disabled={loading}
            >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <MapPin className="h-4 w-4" />
            )}
            </Button>
        </div>
        {showRecent && (
            <RecentSearches
            searches={recentSearches}
            onSelect={handleRecentSelect}
            onClear={clearRecentSearches}
            />
        )}
        </form>
        <div className="flex items-center gap-4">
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
        >
            {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
            ) : (
            <Moon className="h-5 w-5" />
            )}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
        </Button>
        </div>
    </header>
    )
}

