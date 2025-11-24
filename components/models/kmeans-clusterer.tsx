"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputSlider } from "./input-slider"
import { Loader2 } from "lucide-react"

// Componente principal que se encarga de enviar los datos al modelo K-Means,

export function KMeansClusterer() {

  // Estado para mostrar el spinner mientras se consulta la API
  const [loading, setLoading] = useState(false)

  // Estado que guardará la respuesta del backend con la información del cluster
  const [result, setResult] = useState<{
    cluster: number
    distance: number
    clusterSize: number
    description: string
  } | null>(null)

  // Estado del formulario con los tres valores numéricos que el modelo necesita
  const [formData, setFormData] = useState({
    balance: 2000,
    purchases: 5000,
    installmentsPurchases: 1000,
  })

  // Función que llama a el endpoint del backend con los datos del formulario
  const handleCluster = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/predict/kmeans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      // aqui se reicbe la predicción: cluster asignado, distancia, tamaño y descripción
      const data = await response.json()
      setResult(data)

    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false) 
    }
  }

  // Colores visuales para cada cluster
  const clusterColors = [
    "bg-blue-500/5 border-blue-500/30",
    "bg-purple-500/5 border-purple-500/30",
    "bg-cyan-500/5 border-cyan-500/30",
  ]

  // Etiquetas que usaré dependiendo del cluster asignado
  const clusterLabels = ["Premium", "Estándar", "Emergente"]

  // Emojis para hacerlo más visual y agradable
  const clusterEmojis = ["👑", "⚡", "🌱    "]

  return (
    <div className="space-y-6">
      
      {/* Tarjeta principal donde el usuario ajusta los valores que enviará al modelo */}
      <Card>
        <CardHeader>
          <CardTitle>Segmentación con K-Means</CardTitle>
          <CardDescription>
            Agrupa clientes en 3 segmentos basados en comportamiento de compra
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Grid con los sliders para balance, compras y compras en cuotas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Slider: Balance */}
            <InputSlider
              label="Balance en Cuenta"
              value={formData.balance}
              min={0}
              max={10000}
              step={50}
              onChange={(v) => setFormData({ ...formData, balance: v })}
              unit="USD"
            />

            {/* Slider: Compras totales */}
            <InputSlider
              label="Compras Totales"
              value={formData.purchases}
              min={0}
              max={20000}
              step={100}
              onChange={(v) => setFormData({ ...formData, purchases: v })}
              unit="USD"
            />

            {/* Slider: Compras en cuotas */}
            <InputSlider
              label="Compras en Cuotas"
              value={formData.installmentsPurchases}
              min={0}
              max={10000}
              step={50}
              onChange={(v) =>
                setFormData({ ...formData, installmentsPurchases: v })
              }
              unit="USD"
            />

          </div>

          {/* Botón que envía los datos al backend */}
          <Button onClick={handleCluster} disabled={loading} size="lg" className="w-full">
            {loading ? (
              <>
                {/* Icono animado mientras se procesa */}
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              "Asignar a Cluster"
            )}
          </Button>

        </CardContent>
      </Card>


      {/* Si existe un resultado, muestro la tarjeta de información */}
      {result && (
        <div className="space-y-4">

          {/* Tarjeta que muestra el cluster asignado y su información */}
          <Card className={`border ${clusterColors[result.cluster]}`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span></span>
                Cluster {result.cluster}: {clusterLabels[result.cluster]}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Métricas del cluster en formato de grid */}
              <div className="grid grid-cols-3 gap-4">

                {/* Número de cluster */}
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground">Cluster</p>
                  <p className="text-2xl font-bold">{result.cluster}</p>
                </div>

                {/* Distancia a su centroide */}
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground">Distancia</p>
                  <p className="text-2xl font-bold">{result.distance.toFixed(2)}</p>
                </div>

                {/* Tamaño del cluster */}
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground">Tamaño</p>
                  <p className="text-2xl font-bold">{result.clusterSize}</p>
                </div>
              </div>

              {/* Descripción precalculada del cluster */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </div>

            </CardContent>
          </Card>


          {/* Tarjeta con la distribución general de los clusters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribución de Clientes por Cluster</CardTitle>
            </CardHeader>

            <CardContent>

              <div className="space-y-3">
                
                {/* Listado visual de cada cluster */}
                {[
                  { emoji: "", label: "Premium", size: 2100, color: "bg-blue-500/20 border-blue-500/30" },
                  { emoji: "", label: "Estándar", size: 3400, color: "bg-purple-500/20 border-purple-500/30" },
                  { emoji: "", label: "Emergente", size: 3500, color: "bg-cyan-500/20 border-cyan-500/30" },
                ].map((cluster, idx) => (
                  
                  <div key={idx} className={`p-3 rounded-lg border ${cluster.color}`}>
                    <div className="flex items-center justify-between">

                      {/* Etiqueta del cluster */}
                      <span className="text-sm font-medium flex items-center gap-2">
                        <span>{cluster.emoji}</span>
                        {cluster.label}
                      </span>

                      {/* Tamaño del cluster */}
                      <span className="text-sm text-muted-foreground">
                        {cluster.size} clientes
                      </span>

                    </div>
                  </div>
                ))}

              </div>

            </CardContent>
          </Card>

        </div>
      )}
    </div>
  )
}
