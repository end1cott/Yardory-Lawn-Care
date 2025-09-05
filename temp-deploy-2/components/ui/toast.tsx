'use client'
import { createContext, useContext, useState, useEffect } from 'react'

export type Toast = { 
  id: number; 
  title: string; 
  description?: string; 
  status?: 'success' | 'error' | 'default'
}

const Ctx = createContext<{ 
  toasts: Toast[]; 
  push: (t: Omit<Toast, 'id'>) => void 
}>({ toasts: [], push: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = (t: Omit<Toast, 'id'>) => {
    const toast = { ...t, id: Date.now(), status: t.status || 'default' }
    setToasts((prev) => [...prev, toast])
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== toast.id)), 3500)
  }

  return (
    <Ctx.Provider value={{ toasts, push }}>
      {children}
      <div className="fixed left-1/2 top-4 z-50 transform -translate-x-1/2 space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </div>
    </Ctx.Provider>
  )
}

function ToastItem({ toast }: { toast: Toast }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after mount
    const entranceTimer = setTimeout(() => setIsVisible(true), 10)
    
    // Trigger exit animation before removal
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 3200) // Start fadeout 300ms before removal
    
    return () => {
      clearTimeout(entranceTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  const getBorderColor = (status: Toast['status']) => {
    switch (status) {
      case 'success':
        return 'border-green-500'
      case 'error':
        return 'border-red-500'
      default:
        return 'border-gray-300'
    }
  }

  const getIcon = (status: Toast['status']) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      default:
        return 'ℹ️'
    }
  }

  const getAnimationClasses = () => {
    if (isExiting) {
      return 'transform translate-y-2 opacity-0 scale-95'
    }
    if (isVisible) {
      return 'transform translate-y-0 opacity-100 scale-100'
    }
    return 'transform translate-y-2 opacity-0 scale-95'
  }

  return (
    <div
      className={`rounded-xl border-2 bg-white p-4 shadow-lg transition-all duration-300 ease-out pointer-events-auto max-w-sm w-full ${getBorderColor(toast.status)} ${getAnimationClasses()}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">{getIcon(toast.status)}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900">{toast.title}</div>
          {toast.description && (
            <div className="mt-1 text-sm text-gray-600">{toast.description}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export function useToast() { 
  return useContext(Ctx) 
}
