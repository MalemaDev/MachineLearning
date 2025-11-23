"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResultsCard } from "./results-card"
import { InputSlider } from "./input-slider"
import { Loader2 } from "lucide-react"

// Componente principal que implementa la predicción con el modelo KNN.

export function KNNPredictor() {

  // Estado para manejar el indicador de carga mientras se hace la petición
  const [loading, setLoading] = useState(false)

  // Estado donde guarda el resultado recibido del backend
  const [prediction, setPrediction] = useState<{
    churn: boolean
    neighbors: string[]
    distance: number
  } | null>(null)

  // Estado para los valores del formulario que el usuario puede ajustar
  const [formData, setFormData] = useState({
    tenure: 24,           
    monthlyCharges: 65,   
    totalCharges: 1560, 
  })

  // Función que envía los datos al endpoint KNN y trae la respuesta
  const handlePredict = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/predict/knn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      // aqui se guarda la predicción del servidor
      const result = await response.json()
      setPrediction(result)

    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false) 
    }
  }

  return (
    <div className="space-y-6">

      {/* Tarjeta principal donde el usuario ajusta los valores de entrada */}
      <Card>
        <CardHeader>
          <CardTitle>K-Nearest Neighbors (KNN)</CardTitle>
          <CardDescription>
            Clasifica basándose en los 5 clientes más similares históricos
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Los tres sliders del formulario, uno por variable relevante */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Antigüedad del cliente */}
            <InputSlider
              label="Antigüedad (meses)"
              value={formData.tenure}
              min={0}
              max={72}
              onChange={(v) => setFormData({ ...formData, tenure: v })}
              unit="meses"
            />

            {/* Cargos mensuales */}
            <InputSlider
              label="Cargos Mensuales"
              value={formData.monthlyCharges}
              min={0}
              max={150}
              step={0.5}
              onChange={(v) => setFormData({ ...formData, monthlyCharges: v })}
              unit="USD"
            />

            {/* Cargos totales */}
            <InputSlider
              label="Cargos Totales"
              value={formData.totalCharges}
              min={0}
              max={10000}
              step={10}
              onChange={(v) => setFormData({ ...formData, totalCharges: v })}
              unit="USD"
            />
          </div>

          {/* Botón que envía los datos al endpoint */}
          <Button onClick={handlePredict} disabled={loading} size="lg" className="w-full">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              "Buscar Vecinos Cercanos"
            )}
          </Button>

        </CardContent>
      </Card>


      {/* Si hay predicción, renderizo el resultado y la lista de vecinos */}
      {prediction && (
        <div className="space-y-4">

          {/* Tarjeta general del resultado */}
          <ResultsCard
            title="Clasificación KNN"
            prediction={prediction.churn ? "CHURN" : "NO CHURN"}
            isPositive={!prediction.churn}
            details={[
              `Distancia: ${prediction.distance.toFixed(2)}`,
              `K=5 vecinos`,
              `Antigüedad: ${formData.tenure}m`,
              `Cargos: $${formData.monthlyCharges}/m`,
            ]}
            explanation="La clasificación se basa en la mayoría de clase de los 5 vecinos más cercanos en el espacio de características normalizadas."
          />

          {/* Tarjeta adicional con los vecinos cercanos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5 Vecinos Más Cercanos</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">

                {/* Recorro la lista de vecinos que vienen del backend */}
                {prediction.neighbors.map((neighbor, idx) => {
                  const isChurn = neighbor.includes("Sí") // Detecto si el vecino es churn

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 bg-background rounded-lg text-sm border ${
                        isChurn ? "border-red-500/30" : "border-green-500/30"
                      }`}
                    >
                      {/* Número del vecino */}
                      <span className="font-medium">Vecino {idx + 1}</span>

                      {/* Resultado del vecino */}
                      <span className={`font-mono ${isChurn ? "text-red-400" : "text-green-400"}`}>
                        {neighbor.split("Churn = ")[1]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
