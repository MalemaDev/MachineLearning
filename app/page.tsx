import { Home } from "@/components/home"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Machine Learning",
  

  description: "Plataforma integrada para prueba de modelos de Machine Learning - Regresión Logística, KNN y K-Means",
  // Descripción de la página, útil para SEO y para mostrar en buscadores.

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  // Configuración del viewport para asegurar que la página se vea bien en dispositivos móviles.
}

export default function Page() {
  // Defino el componente principal de la página.
  // Next.js usará este componente como el contenido de la ruta.

  return <Home />
  // Renderizo el componente Home, que contiene la UI principal de la aplicación.
}
