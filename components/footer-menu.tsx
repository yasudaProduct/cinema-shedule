'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Film, Calendar, Settings, LogIn, LogOut } from 'lucide-react'
import { useMovieContext } from '@/context/MovieContext'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

const menuItems = [
  { icon: Home, label: 'ホーム', href: '/' },
  { icon: Film, label: '映画選択', href: '/movies' },
  { icon: Calendar, label: 'スケジュール', href: '/schedule' },
  { icon: Settings, label: '設定', href: '/settings' },
]

export function FooterMenu() {
  const pathname = usePathname()
  const { selectedMovies } = useMovieContext()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    console.log('useEffect')
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
    };

    getSession();

    // リアルタイムでセッション変更を監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };

  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success("ログアウト成功")
  }

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
        {session ? (
          <button
            onClick={handleLogout}
            className="flex flex-col items-center py-2 px-4 text-gray-600"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-xs mt-1">ログアウト</span>
          </button>
        ) : (
          <Link
            href="/auth/signin"
            className="flex flex-col items-center py-2 px-4 text-gray-600"
          >
            <LogIn className="w-6 h-6" />
            <span className="text-xs mt-1">ログイン</span>
          </Link>
        )}
      </nav>
    </footer>
  )
}

