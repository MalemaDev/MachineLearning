import { type NextRequest, NextResponse } from "next/server"


import { makeKNNPrediction } from "@/lib/ml-utils"


export async function POST(request: NextRequest) {
 
  try {
    const data = await request.json()
    // Obtengo el cuerpo de la petición en formato JSON.

    const { tenure, monthlyCharges, totalCharges } = data
  

    if (tenure === undefined || monthlyCharges === undefined || totalCharges === undefined) {
      // Valido que todos los parámetros requeridos estén presentes.
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
      // Si falta alguno, devuelvo un error 400 (Bad Request).
    }

    const result = makeKNNPrediction(tenure, monthlyCharges, totalCharges)
    // Llamo a mi función de predicción KNN con los datos recibidos.

    return NextResponse.json({
      churn: result.churn,
      neighbors: result.neighbors,
      distance: result.distance,
      prediction: result.churn ? "Churn" : "No Churn",
    })
   
  } catch (error) {
    console.error("Error en predicción KNN:", error)
   

    return NextResponse.json({ error: "Error al hacer la predicción" }, { status: 500 })
   
  }
}
