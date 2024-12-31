import { Button } from "@/components/ui/button"
import { ArrowRight, Film, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-md mx-auto text-center">
      <Film className="w-16 h-16 mx-auto text-indigo-600 mb-6" />
      <h1 className="text-3xl font-bold mb-4">映画マラソンプランナー</h1>
      <p className="text-gray-600 mb-8">
        複数の映画館で最適な映画鑑賞スケジュールを立てよう！
      </p>

      <div className="space-y-6 mb-8">
        <FeatureItem
          icon={Calendar}
          title="スケジュール最適化"
          description="上映時間と移動時間を考慮した最適なプランを提案"
        />
        <FeatureItem
          icon={Film}
          title="映画情報管理"
          description="映画館情報、上映スケジュール、映画情報を一元管理"
        />
        <FeatureItem
          icon={MapPin}
          title="経路案内"
          description="映画館間の推奨移動経路と所要時間を表示"
        />
      </div>

      <Link href="/movies">
        <Button className="w-full">
          映画を選択する
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  )
}

function FeatureItem({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="flex items-start">
      <div className="bg-indigo-100 rounded-full p-3 mr-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div className="text-left">
        <h2 className="font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}