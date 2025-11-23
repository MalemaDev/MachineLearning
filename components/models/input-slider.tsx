"use client"

// Importo el componente Label desde shadcn/ui
import { Label } from "@/components/ui/label"

//propiedades que recibirá mi componente
interface InputSliderProps {
  label: string             
  value: number              
  min: number               
  max: number              
  step?: number             
  onChange: (value: number) => void 
  unit?: string              // Unidad de medida (opcional)
}

// Componente InputSlider: un input tipo "range" con etiqueta y valor
export function InputSlider({ label, value, min, max, step = 1, onChange, unit = "" }: InputSliderProps) {

  // Calculo el porcentaje para colorear el fondo del slider dinámicamente
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-2">
      
      {/* Encabezado con la etiqueta y el valor actual */}
      <div className="flex items-center justify-between">
        <Label htmlFor="slider">{label}</Label>

        {/* Muestro el valor con formato:
            - Si el step es decimal, muestro 2 decimales
            - Si es entero, no uso decimales */}
        <span className="text-sm font-mono text-accent">
          {value.toFixed(step < 1 ? 2 : 0)} {unit}
        </span>
      </div>

      {/* Slider principal */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}

        // Cuando cambia el slider, seconvierte el valor a número y lo envía al callback
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}

        // Clases base del slider
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"

        // Fondo dinámico para mostrar la parte completada
        style={{
          background: `linear-gradient(
            to right,
            var(--color-accent) 0%,
            var(--color-accent) ${percentage}%,
            var(--color-muted) ${percentage}%,
            var(--color-muted) 100%
          )`,
        }}
      />

      {/* Texto inferior con los valores mínimo y máximo */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  )
}
