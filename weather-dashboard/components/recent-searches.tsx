'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/ScrollArea'

interface RecentSearchesProps {
    searches: string[]
    onSelect: (city: string) => void
    onClear: () => void
}

export function RecentSearches({
    searches,
    onSelect,
    onClear,
}: RecentSearchesProps) {
    if (searches.length === 0) return null

    return (
    <div className="absolute top-full left-0 w-full mt-1 bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg z-50">
        <div className="p-2 flex items-center justify-between">
        <h3 className="text-sm font-medium">Recent Searches</h3>
        <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs text-muted-foreground"
        >
            Clear
        </Button>
        </div>
        <ScrollArea className="h-[200px]">
        <div className="p-2">
            {searches.map(city => (
            <Button
                key={city}
                variant="ghost"
                size="sm"
                onClick={() => onSelect(city)}
                className="w-full justify-start text-left"
            >
                {city}
            </Button>
            ))}
        </div>
        </ScrollArea>
    </div>
    )
}

