import { NextResponse } from "next/server"
// se importa NextResponse desde el módulo de servidor de Next.js para devolver respuestas HTTP

export async function GET() {


  return NextResponse.json({
    status: "ok", 
    message: "ML Models API is running", 
    models: ["Logistic Regression", "KNN", "K-Means"], 
    timestamp: new Date().toISOString(), 
   
  })
}
