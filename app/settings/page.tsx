'use client'

import { useState } from 'react'
import { useSettings } from '@/context/SettingsContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings()
  const [formData, setFormData] = useState(settings)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings(formData)
    toast.success("設定を保存しました")
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      <Card>
        <CardHeader>
          <CardTitle>アプリケーション設定</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultTravelTime">デフォルトの移動時間（分）</Label>
              <Input
                type="number"
                id="defaultTravelTime"
                name="defaultTravelTime"
                value={formData.defaultTravelTime}
                onChange={handleChange}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breakTimeBetweenMovies">映画間の休憩時間（分）</Label>
              <Input
                type="number"
                id="breakTimeBetweenMovies"
                name="breakTimeBetweenMovies"
                value={formData.breakTimeBetweenMovies}
                onChange={handleChange}
                min={0}
              />
            </div>
            <Button type="submit" className="w-full">
              設定を保存
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}