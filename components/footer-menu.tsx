'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Film, Calendar, Settings } from 'lucide-react'
import { useMovieContext } from '@/context/MovieContext'

const menuItems = [
  { icon: Home, label: 'ホーム', href: '/' },
  { icon: Film, label: '映画選択', href: '/movies' },
  { icon: Calendar, label: 'スケジュール', href: '/schedule' },
  { icon: Settings, label: '設定', href: '/settings' },
]

export function FooterMenu() {
  const pathname = usePathname()
  const { selectedMovies } = useMovieContext()

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <nav className="flex justify-around">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center py-2 px-4 ${
              pathname === item.href ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.label === '映画選択' && selectedMovies.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {selectedMovies.length}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  )
}