import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Plus, Check } from 'lucide-react'
import { MovieWithTheater } from "@/types/movie"

interface MovieCardProps {
  movie: MovieWithTheater
  onAdd: () => void
  isSelected: boolean
}

export default function MovieCard({
  movie,
  onAdd,
  isSelected,
}: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="relative w-1/3 aspect-[3/4]">
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="w-2/3 p-4">
          <h3 className="font-bold mb-2 text-sm">{movie.title}</h3>
          <div className="space-y-1 text-xs text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {movie.theater.name}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {movie.startTime} - {movie.duration}分
            </div>
          </div>
          <Button 
            className="w-full text-xs py-1 h-8" 
            size="sm" 
            onClick={onAdd}
            disabled={isSelected}
          >
            {isSelected ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                追加済み
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1" />
                追加
              </>
            )}
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}

