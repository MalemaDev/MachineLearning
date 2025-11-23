"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogisticRegressionPredictor } from "./models/logistic-regression-predictor"
import { KNNPredictor } from "./models/knn-predictor"
import { KMeansClusterer } from "./models/kmeans-clusterer"
import { ModelComparison } from "./model-comparison"

export function Home() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Encabezado */}
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Parcial Final Machine Learning</h1>
              <p className="text-muted-foreground text-sm mt-1">Regresión Logística, KNN y K-Means</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Create By Miguel Angel Lema</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="logistic">Regresión Logística</TabsTrigger>
            <TabsTrigger value="knn">KNN</TabsTrigger>
            <TabsTrigger value="kmeans">K-Means</TabsTrigger>
          </TabsList>

          {/* Pestaña de descripcion general */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card-secondary">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Regresión Logística</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">Accuracy en datos de prueba</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Clasificación binaria para predicción de Churn de clientes Telco
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card-secondary">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">KNN (K=5)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold">90.8%</div>
                  <p className="text-xs text-muted-foreground">Accuracy en datos de prueba</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    K-Nearest Neighbors para clasificación de clientes por proximidad
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card-secondary">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">K-Means (k=3)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold">0.62</div>
                  <p className="text-xs text-muted-foreground">Silhouette Score</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Clustering no supervisado para segmentación de clientes
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Comparación de Modelos</CardTitle>
                <CardDescription>Resumen de características y performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ModelComparison />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña Regresion Logistica */}
          <TabsContent value="logistic">
            <LogisticRegressionPredictor />
          </TabsContent>

          {/* Pestaña KNN */}
          <TabsContent value="knn">
            <KNNPredictor />
          </TabsContent>

          {/* Pestaña K-Means  */}
          <TabsContent value="kmeans">
            <KMeansClusterer />
          </TabsContent>
        </Tabs>
      </main>

     
    </div>
  )
}
