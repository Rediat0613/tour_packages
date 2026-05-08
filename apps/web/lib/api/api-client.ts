import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios"
import { getCookie } from "cookies-next/client"

import { COOKIE_ACCESS_TOKEN, COOKIE_ORGANIZATION_ID } from "./constants"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

export async function prepareRequestHeaders(headers: AxiosHeaders): Promise<AxiosHeaders> {
  const accessToken = getCookie(COOKIE_ACCESS_TOKEN)
  const organizationId = getCookie(COOKIE_ORGANIZATION_ID)

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  } else {
    headers.delete("Authorization")
  }

  if (organizationId) {
    headers.set("x-organization-id", organizationId)
  } else {
    headers.delete("x-organization-id")
  }

  return headers
}

let client: ReturnType<typeof axios.create> | null = null

export function getApiClient() {
  if (!client) {
    client = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    })
    client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
      config.headers = await prepareRequestHeaders(AxiosHeaders.from(config.headers))
      return config
    })
  }

  return client
}
