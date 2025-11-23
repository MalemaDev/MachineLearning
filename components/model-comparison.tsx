"use client" 


export function ModelComparison() {


  // Array de objetos que contiene la información detallada de cada modelo de Machine Learning.
  const models = [
    {
      name: "Regresión Logística",
      type: "Supervisado", 
      accuracy: "94.2%",
      use_case: "Predicción binaria de Churn",
      pros: ["Alta precisión", "Interpretable", "Rápido"],
      cons: ["Requiere etiquetas", "Asume linealidad"],
    },
    {
      name: "KNN",
      type: "Supervisado",
      accuracy: "90.8%",
      use_case: "Clasificación local",
      pros: ["Simple", "No paramétrico", "Flexible"],
      cons: ["Lento en predicción", "Sensible a outliers"],
    },
    {
      name: "K-Means",
      type: "No Supervisado",
    
      accuracy: "Silhouette: 0.62", 
      use_case: "Segmentación de clientes",
      pros: ["No requiere etiquetas", "Escalable", "Interpretable"],
      cons: ["Requiere k predefinido", "Sensible a inicialización"],
    },
  ]


  return (
    // Contenedor principal para permitir el desplazamiento horizontal en pantallas pequeñas
    <div className="overflow-x-auto">
     
      <table className="w-full text-sm">
      
        <thead>
          <tr className="border-b border-border">
      
            <th className="text-left py-3 px-4 font-semibold">Modelo</th>
            <th className="text-left py-3 px-4 font-semibold">Tipo</th>
            <th className="text-left py-3 px-4 font-semibold">Performance</th>
            <th className="text-left py-3 px-4 font-semibold">Caso de Uso</th>
          </tr>
        </thead>
        
        {/* Cuerpo de la tabla */}
        <tbody>
      
          {models.map((model) => (
            // Fila de la tabla: clave única (key) basada en el nombre del modelo.
            
            <tr key={model.name} className="border-b border-border hover:bg-muted/50">
              
           
              <td className="py-4 px-4 font-medium">{model.name}</td>
         
              <td className="py-4 px-4">
                {/* Etiqueta visual pequeña (badge) para el tipo, usando clases de fondo y padding */}
                <span className="text-xs bg-muted px-2 py-1 rounded">{model.type}</span>
              </td>
              
           
              <td className="py-4 px-4 font-mono text-accent">{model.accuracy}</td>
        
              <td className="py-4 px-4 text-muted-foreground">{model.use_case}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}