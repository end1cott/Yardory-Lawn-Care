'use client'
import { createContext, useContext, useState } from 'react'

export type Toast = { id: number; title: string; description?: string }
const Ctx = createContext<{ toasts: Toast[]; push: (t: Omit<Toast, 'id'>) => void }>({ toasts: [], push: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = (t: Omit<Toast, 'id'>) => {
    const toast = { ...t, id: Date.now() }
    setToasts((prev) => [...prev, toast])
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== toast.id)), 3500)
  }
  return (
    <Ctx.Provider value={{ toasts, push }}>
      {children}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="rounded-xl border bg-white p-4 shadow-soft">
            <div className="font-medium">{t.title}</div>
            {t.description && <div className="text-sm opacity-80">{t.description}</div>}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}

export function useToast() { return useContext(Ctx) }
