import { deleteCookie, setCookie } from "cookies-next/client"

import { COOKIE_ACCESS_TOKEN, COOKIE_ORGANIZATION_ID } from "./constants"

const LS_ACCESS = "expeditionLocal.accessToken"
const LS_REFRESH = "expeditionLocal.refreshToken"
const LS_USER = "expeditionLocal.user"

const cookieOptions = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  sameSite: "lax" as const,
}

/** Persist access token (cookie + storage), refresh token, and user snapshot after login or refresh. */
export function persistAuthTokens(response: {
  accessToken: string
  refreshToken: string
  user: unknown
}) {
  setCookie(COOKIE_ACCESS_TOKEN, response.accessToken, cookieOptions)
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LS_ACCESS, response.accessToken)
    window.localStorage.setItem(LS_REFRESH, response.refreshToken)
    window.localStorage.setItem(LS_USER, JSON.stringify(response.user))
  }
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return window.localStorage.getItem(LS_REFRESH)
}

/** Clear session cookie and client storage. */
export function clearAuthSession() {
  deleteCookie(COOKIE_ACCESS_TOKEN, { path: "/" })
  deleteCookie(COOKIE_ORGANIZATION_ID, { path: "/" })
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(LS_ACCESS)
    window.localStorage.removeItem(LS_REFRESH)
    window.localStorage.removeItem(LS_USER)
  }
}
