'use client'

import * as React from 'react'

// Importamos los tipos de componentes de Toast de nuestra UI
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'



// Limita el número de toasts visibles a la vez. (Solo 1 toast visible)
const TOAST_LIMIT = 1

const TOAST_REMOVE_DELAY = 1000000



// Definición completa de un toast, extendiendo las props de Toast y añadiendo campos opcionales.
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Tipos de acciones para el Reducer (similar a Redux/useReducer)
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST', 
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST', 
  REMOVE_TOAST: 'REMOVE_TOAST', 
} as const


let count = 0

// Función para generar un ID único para cada toast
function genId() {
 
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

// Unión de todos los posibles objetos de acción
type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

// Interfaz para el estado global de los toasts
interface State {
  toasts: ToasterToast[]
}

// Mapa para almacenar los temporizadores de eliminación, usando el ID del toast como clave
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Función que añade un ID de toast a la cola de eliminación (programada)
const addToRemoveQueue = (toastId: string) => {
  // Si ya hay un temporizador para este toast, salimos
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Configura un temporizador para despachar la acción 'REMOVE_TOAST'
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    // Usamos 'dispatch' para enviar la acción de remover
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY) // El tiempo definido por la constante

  // Guardamos el temporizador en el mapa
  toastTimeouts.set(toastId, timeout)
}



// La función principal del Reducer, que calcula el nuevo estado
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        // Añade el nuevo toast al principio y aplica el límite (TOAST_LIMIT)
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        // Mapea el array de toasts y actualiza el que coincide con el ID
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // 1. Manejo de la cola de remoción (programar la eliminación real)
      if (toastId) {
        // Si se especificó un ID, añadimos solo ese a la cola
        addToRemoveQueue(toastId)
      } else {
        // Si no se especificó un ID, añadimos todos los toasts a la cola
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // 2. Actualización del estado (establecer open: false)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          // Si el ID coincide o si no se especificó ID (dismiss all)
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Esto activa la animación de cierre en el componente de UI
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      // Si no se especificó un ID (remove all)
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [], // Vacía el array de toasts
        }
      }
      // Elimina el toast con el ID especificado del array
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}



// Array para almacenar todas las funciones 'setState' de los componentes que usan useToast
const listeners: Array<(state: State) => void> = []

// Estado real almacenado en memoria (fuera de React)
let memoryState: State = { toasts: [] }

// Función de despacho que actualiza el estado y notifica a todos los 'listeners'
function dispatch(action: Action) {
  // 1. Aplica la acción al estado en memoria
  memoryState = reducer(memoryState, action)
  // 2. Notifica a cada componente suscrito para forzar la re-renderización
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Tipo de las props de toast que se pasan a la función 'toast' (sin el ID)
type Toast = Omit<ToasterToast, 'id'>

// Función para crear y despachar un nuevo toast
function toast({ ...props }: Toast) {
  const id = genId()

  // Función de ayuda para actualizar el toast
  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })

  // Función de ayuda para cerrar el toast
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  // Despacha la acción de añadir el toast al estado
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true, // Inicialmente visible
      // Agrega un callback para manejar el cierre desde el componente de UI (ej. al hacer clic fuera)
      onOpenChange: (open) => {
        if (!open) dismiss() // Si el componente de UI lo cierra, disparamos el dismiss
      },
    },
  })

  // Retorna métodos para controlar el toast recién creado
  return {
    id: id,
    dismiss,
    update,
  }
}



// Hook para acceder al estado de los toasts y sus funciones de control
function useToast() {
 
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Suscribir: Añade el 'setState' del componente al array de listeners
    listeners.push(setState)
    
    // Desuscribir: Limpia el listener al desmontar el componente
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state]) // La dependencia [state] es inusual, pero asegura que el effect se vuelva a ejecutar si 'state' cambia, lo que podría no ser la intención. Típicamente, sería `[]`.

  // Retorna el estado actual, la función 'toast' y la función 'dismiss' global
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}


export { useToast, toast }