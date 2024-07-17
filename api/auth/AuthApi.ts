import { AbstractApi } from '../utils/AbstractApi'
import { ApiResponse } from '../utils/ApiResponse'

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}
export class AuthApi extends AbstractApi<AuthResponse> {
  constructor() {
    super('auth')
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
}
