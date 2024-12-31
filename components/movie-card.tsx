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
      <div className="relative aspect-[16/9]">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-2">{movie.title}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {movie.theater.name}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {movie.startTime} - {movie.duration}分
          </div>
        </div>
        <Button 
          className="w-full" 
          size="sm" 
          onClick={onAdd}
          disabled={isSelected}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              追加済み
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              追加
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

