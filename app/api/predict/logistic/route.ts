import { type NextRequest, NextResponse } from "next/server"
import { makeLogisticPrediction } from "@/lib/ml-utils"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { tenure, monthlyCharges, totalCharges, contractMonthly } = data

    // Validar entrada
    if (
      tenure === undefined ||
      monthlyCharges === undefined ||
      totalCharges === undefined ||
      contractMonthly === undefined
    ) {
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    // Hacer predicción
    const result = makeLogisticPrediction(tenure, monthlyCharges, totalCharges, contractMonthly)

    return NextResponse.json({
      churn: result.prediction === "Churn",
      probability: result.probability,
      prediction: result.prediction,
      confidence: result.confidence,
      explanation: result.explanation,
    })
  } catch (error) {
    console.error("Error en predicción Logistic:", error)
    return NextResponse.json({ error: "Error al hacer la predicción" }, { status: 500 })
  }
}
