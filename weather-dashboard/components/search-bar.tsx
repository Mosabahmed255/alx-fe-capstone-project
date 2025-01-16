'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
    onSearch: (city: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const city = formData.get('city') as string
    if (city.trim()) {
        onSearch(city)
    }
    }

    return (
    <form onSubmit={handleSubmit} className="relative">
        <Input
        name="city"
        placeholder="Search City"
        className="w-full bg-background/50 pl-10"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
    </form>
    )
}

