"use client"

import { getCookie } from "cookies-next/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useMemo } from "react"

import { getMe } from "@/app/[locale]/_components/auth/_services/auth.api"
import type { AuthUser } from "@/app/[locale]/_components/auth/_services/auth.type"
import { clearAuthSession } from "@/lib/api/auth-session"
import { COOKIE_ACCESS_TOKEN } from "@/lib/api/constants"

const sessionQueryKey = ["auth", "session"] as const

async function fetchSessionUser(): Promise<AuthUser | null> {
  if (!getCookie(COOKIE_ACCESS_TOKEN)) {
    return null
  }
  try {
    return await getMe()
  } catch {
    clearAuthSession()
    return null
  }
}

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  refreshUser: () => Promise<unknown>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams<{ locale: string }>()
  const queryClient = useQueryClient()
  const locale = params.locale ?? "en"

  const { data: user = null, isPending, refetch } = useQuery({
    queryKey: sessionQueryKey,
    queryFn: fetchSessionUser,
    staleTime: 60_000,
  })

  const refreshUser = useCallback(() => refetch(), [refetch])

  const logout = useCallback(() => {
    clearAuthSession()
    queryClient.removeQueries({ queryKey: sessionQueryKey })
    queryClient.clear()
    router.replace(`/${locale}/login`)
  }, [locale, queryClient, router])

  const value = useMemo(
    () => ({
      user,
      isLoading: isPending,
      refreshUser,
      logout,
    }),
    [user, isPending, refreshUser, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
