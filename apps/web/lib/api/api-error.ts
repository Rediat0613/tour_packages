import axios, { AxiosError } from "axios"

export type ApiErrorBody = {
  message?: string | string[]
  error?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

function readErrorMessage(body: ApiErrorBody | undefined): string {
  if (!body) {
    return "Something went wrong. Please try again."
  }

  if (Array.isArray(body.message)) {
    return body.message.join(" ")
  }

  return body.message ?? body.error ?? "Something went wrong. Please try again."
}

/** Normalize Axios / unknown errors for UI and mutations. */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>
    const message = readErrorMessage(axiosError.response?.data)

    return new ApiError(message, axiosError.response?.status ?? 500)
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500)
  }

  return new ApiError("Something went wrong. Please try again.", 500)
}
