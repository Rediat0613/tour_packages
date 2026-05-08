import { mutationOptions, queryOptions } from "@tanstack/react-query"

import { getApiClient } from "@/lib/api/api-client"
import { toApiError } from "@/lib/api/api-error"
import { persistAuthTokens } from "@/lib/api/auth-session"
import {
  type AuthResponse,
  type AuthUser,
  type LoginPayload,
  type RegisterAgencyStaffPayload,
} from "./auth.type"

const http = () => getApiClient()

export async function login(payload: LoginPayload) {
  try {
    const { data } = await http().post<AuthResponse>("/auth/login", payload)
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function registerAgencyStaff(payload: RegisterAgencyStaffPayload) {
  try {
    const { data } = await http().post<AuthResponse>(
      "/auth/register-agency-staff",
      payload,
    )
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function getMe() {
  try {
    const { data } = await http().get<AuthUser>("/auth/me")
    return data
  } catch (error) {
    throw toApiError(error)
  }
}

export function persistAuth(response: AuthResponse) {
  persistAuthTokens(response)
}

export const authQueries = {
  me: () =>
    queryOptions({
      queryKey: ["auth", "me"],
      queryFn: getMe,
      staleTime: 60_000,
    }),
}

export const authMutations = {
  login: () =>
    mutationOptions({
      mutationKey: ["auth", "login"],
      mutationFn: login,
    }),
  registerAgencyStaff: () =>
    mutationOptions({
      mutationKey: ["auth", "register-agency-staff"],
      mutationFn: registerAgencyStaff,
    }),
}
