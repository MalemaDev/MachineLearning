import { type NextRequest, NextResponse } from "next/server"
import { makeKMeansPrediction } from "@/lib/ml-utils"
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // Obtengo el cuerpo de la petición en formato JSON.

    const { balance, purchases, installmentsPurchases } = data
    // Extraigo los parámetros necesarios para el clustering.

    if (balance === undefined || purchases === undefined || installmentsPurchases === undefined) {
      // Valido que todos los parámetros requeridos estén presentes.
      return NextResponse.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
      // Si falta alguno, devuelvo un error 400 (Bad Request).
    }

    const result = makeKMeansPrediction(balance, purchases, installmentsPurchases)
    // Llamo a mi función de clustering K-Means con los datos recibidos.

    return NextResponse.json({
      cluster: result.cluster,
      distance: result.distance,
      clusterSize: result.clusterSize,
      description: result.description,
    })
 
  } catch (error) {
    console.error("Error en clustering K-Means:", error)

    return NextResponse.json({ error: "Error al hacer el clustering" }, { status: 500 })

  }
}
