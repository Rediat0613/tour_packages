"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAuth } from "./auth-provider"

type Props = {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams<{ locale: string }>()
  const locale = params.locale ?? "en"

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (!user) {
      router.replace(`/${locale}/login`)
    }
  }, [user, isLoading, router, locale])

  if (isLoading || !user) {
    return null
  }

  return <>{children}</>
}
