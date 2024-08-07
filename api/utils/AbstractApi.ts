import { ApiResponse, ServerError, ResponseError } from './index'
import * as SecureStore from 'expo-secure-store'
export const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL

export interface ApiRequestParams {
  queries?: Record<string, string>
  requestOptions?: RequestInit
  pathExtension?: string
}

export abstract class AbstractApi<T> {
  readonly path: string
  readonly secure: boolean

  constructor(path: string, secure = true) {
    this.path = path
    this.secure = secure
  }

  protected async doFetch(requestParams?: ApiRequestParams): Promise<ApiResponse<T | T[]>> {
    let url = `${baseUrl}${this.path}`
    console.log(url)

    if (requestParams && requestParams.pathExtension) {
      url += `/${requestParams.pathExtension}`
    }

    if (requestParams && requestParams.queries) {
      const query = new URLSearchParams(requestParams.queries)
      query.toString() && (url += `?${query.toString()}`)
    }
    let accessToken: string | undefined

    if (this.secure) {
      const tokens = await SecureStore.getItemAsync('tokens')
      accessToken = tokens ? JSON.parse(tokens).accessToken : undefined

      if (!accessToken) {
        throw new ServerError({
          error: {
            message: 'Unauthorized',
            response: 'Unauthorized',
            name: 'Unauthorized',
            status: 401,
          },
          timestamp: new Date().getTime(),
        })
      }
    }

    try {
      const response = await fetch(url, {
        ...requestParams?.requestOptions,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          ...(requestParams?.requestOptions?.headers ?? {}),
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        const errorBody = await response.json()
        throw new ServerError(errorBody as ResponseError)
      }

      const body = await response.json()
      return { payload: body.payload }
    } catch (error) {
      // If the error is from the backend, it should follow the ResponseError structure
      if (error instanceof ServerError) {
        throw error
      }

      // If the error is not from the backend, we create a similar structure to maintain consistency
      if (error instanceof Error) {
        throw new ServerError({
          error: {
            message: error.message,
            name: error.name,
            response: error.message,
            status: error.name === 'TypeError' ? 500 : 400,
          },
          timestamp: new Date().getTime(),
        })
      }

      throw new ServerError({
        error: {
          message: 'An error occurred while fetching data',
          name: 'Error',
          response: 'An error occurred while fetching data',
          status: 400,
        },
        timestamp: new Date().getTime(),
      })
    }
  }
}
