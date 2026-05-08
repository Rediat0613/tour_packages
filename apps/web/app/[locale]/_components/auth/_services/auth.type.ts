export { COOKIE_ACCESS_TOKEN, COOKIE_ORGANIZATION_ID } from "@/lib/api/constants"

export type AuthRole = "AGENCY_STAFF" | "ADMIN"

export type AuthUser = {
  id: string
  email: string
  fullName: string
  role: AuthRole
  agencyId: string | null
}

export type AuthResponse = {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterAgencyStaffPayload = LoginPayload & {
  fullName: string
  agencyName: string
}
