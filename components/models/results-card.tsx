"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ResultsCardProps {
  title: string
  prediction: string
  probability?: number
  isPositive: boolean
  details: string[]
  explanation: string
}

export function ResultsCard({ title, prediction, probability, isPositive, details, explanation }: ResultsCardProps) {
  const bgColor = isPositive ? "bg-green-500/5 border-green-500/30" : "bg-red-500/5 border-red-500/30"
  const textColor = isPositive ? "text-green-400" : "text-red-400"
  const Icon = isPositive ? CheckCircle : AlertCircle

  return (
    <Card className={`border ${bgColor}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${textColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Prediccion Principal */}
        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Predicción</p>
            <p className={`text-2xl font-bold ${textColor}`}>{prediction}</p>
          </div>
          {probability !== undefined && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Confianza</p>
              <p className="text-2xl font-bold">{(probability * 100).toFixed(1)}%</p>
            </div>
          )}
        </div>

        {/* Cuadriculas de detalle */}
        {details.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {details.map((detail, idx) => (
              <div key={idx} className="p-2 bg-muted rounded text-xs text-muted-foreground">
                {detail}
              </div>
            ))}
          </div>
        )}

        {/* Explicacion */}
        <div className="p-3 bg-muted rounded-lg text-sm">
          <p className="text-muted-foreground">{explanation}</p>
        </div>
      </CardContent>
    </Card>
  )
}
