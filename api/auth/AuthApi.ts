import { AbstractApi } from '../utils/AbstractApi'
import { ApiResponse } from '../utils/ApiResponse'

/* type
        "user": {
            "id": 6,
            "email": "selim@test10.com",
            "firstName": "Selim",
            "lastName": "Selim",
            "verificationCode": "130384",
            "isVerified": false,
            "refreshToken": null,
            "createdAt": "2024-07-17T16:33:50.906Z",
            "updatedAt": "2024-07-17T16:33:50.906Z"
        }
*/
export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  verificationCode: string
  isVerified: boolean
  refreshToken: string
  createdAt: string
  updatedAt: string
} | null

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}
export class AuthApi extends AbstractApi<AuthResponse> {
  constructor() {
    super('auth', false)
  }

  async login(loginDto: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> {
    const data = (await this.doFetch({
      requestOptions: {
        method: 'POST',
        body: JSON.stringify(loginDto),
      },
      pathExtension: 'login',
    })) as ApiResponse<AuthResponse>

    return data
  }

  async verify(verifyDto: {
    email: string
    verificationCode: string
  }): Promise<ApiResponse<AuthResponse>> {
    const data = (await this.doFetch({
      requestOptions: {
        method: 'POST',
        body: JSON.stringify(verifyDto),
      },
      pathExtension: 'verify',
    })) as ApiResponse<AuthResponse>

    return data
  }

  async signUp(signUpDto: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<ApiResponse<AuthResponse>> {
    const data = (await this.doFetch({
      requestOptions: {
        method: 'POST',
        body: JSON.stringify(signUpDto),
      },
      pathExtension: 'register',
    })) as ApiResponse<AuthResponse>

    return data
  }
}
