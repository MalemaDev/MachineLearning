"use client" 

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ResultsCard } from "./results-card"
import { InputSlider } from "./input-slider"
import { Loader2 } from "lucide-react"


export function LogisticRegressionPredictor() {
  

  const [loading, setLoading] = useState(false)
  // Estado para saber si la predicción está en proceso.

  const [prediction, setPrediction] = useState<{
    churn: boolean
    probability: number
    explanation: string
    confidence: number
  } | null>(null)
  // Estado para guardar el resultado de la predicción (churn, probabilidad, explicación, confianza).

  const [formData, setFormData] = useState({
    tenure: 24,
    monthlyCharges: 65,
    totalCharges: 1560,
    contractMonthly: 1,
  })
  // Estado inicial con valores por defecto para el formulario.

  const handlePredict = async () => {
   
    setLoading(true)
    try {
      const response = await fetch("/api/predict/logistic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      // se envia los datos del formulario a mi endpoint de predicción.

      const result = await response.json()
   
      setPrediction({
        churn: result.churn,
        probability: result.probability,
        explanation: result.explanation,
        confidence: result.confidence,
      })
      
    } catch (error) {
      console.error("Error:", error)
      
    } finally {
      setLoading(false)
     
    }
  }

  return (
    <div className="space-y-6">
      {/* Contenedor principal con separación vertical */}

      <Card>
        <CardHeader>
          <CardTitle>Predicción de Churn - Regresión Logística</CardTitle>
          <CardDescription>
            Modelo de clasificación binaria entrenado con 5,614 clientes históricos
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Contenido de la tarjeta con espacio entre elementos */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grid para organizar los sliders en columnas */}

            <InputSlider
              label="Antigüedad (meses)"
              value={formData.tenure}
              min={0}
              max={72}
              onChange={(v) => setFormData({ ...formData, tenure: v })}
              unit="meses"
            />
            {/* Slider para la antigüedad del cliente */}

            <InputSlider
              label="Cargos Mensuales"
              value={formData.monthlyCharges}
              min={0}
              max={150}
              step={0.5}
              onChange={(v) => setFormData({ ...formData, monthlyCharges: v })}
              unit="USD"
            />
            {/* Slider para los cargos mensuales */}

            <InputSlider
              label="Cargos Totales"
              value={formData.totalCharges}
              min={0}
              max={10000}
              step={10}
              onChange={(v) => setFormData({ ...formData, totalCharges: v })}
              unit="USD"
            />
            {/* Slider para los cargos totales */}

            <div className="space-y-2">
              <Label htmlFor="contract">Tipo de Contrato</Label>
              <select
                id="contract"
                value={formData.contractMonthly}
                onChange={(e) =>
                  setFormData({ ...formData, contractMonthly: Number.parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value={1}>Mes a Mes</option>
                <option value={0}>Contrato Largo Plazo</option>
              </select>
            </div>
            {/* Selector para el tipo de contrato */}
          </div>

          <Button onClick={handlePredict} disabled={loading} size="lg" className="w-full">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              "Hacer Predicción"
            )}
          </Button>
          {/* Botón que dispara la predicción. Si está cargando muestra el spinner. */}
        </CardContent>
      </Card>

      {prediction && (
        <ResultsCard
          title="Resultado de la Predicción"
          prediction={prediction.churn ? "CHURN (Se irá)" : "NO CHURN (Se quedará)"}
          probability={prediction.probability}
          isPositive={!prediction.churn}
          details={[
            `Antigüedad: ${formData.tenure} meses`,
            `Cargos/Mes: $${formData.monthlyCharges}`,
            `Cargos Totales: $${formData.totalCharges}`,
            `Confianza: ${(prediction.confidence * 100).toFixed(1)}%`,
          ]}
          explanation={prediction.explanation}
        />
      )}
      {/* Si ya hay predicción, muestro el componente ResultsCard con los detalles */}
    </div>
  )
}
