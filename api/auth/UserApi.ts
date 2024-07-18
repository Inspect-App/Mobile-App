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
}

export class UserApi extends AbstractApi<User> {
  constructor() {
    super('auth')
  }

  //   async login(loginDto: { email: string; password: string }): Promise<ApiResponse<User>> {
  //     const data = (await this.doFetch({
  //       requestOptions: {
  //         method: 'POST',
  //         body: JSON.stringify(loginDto),
  //       },
  //       pathExtension: 'login',
  //     })) as ApiResponse<AuthResponse>

  //     return data
  //   }

  async getMe(): Promise<ApiResponse<User>> {
    const data = (await this.doFetch({
      requestOptions: {
        method: 'GET',
      },
      pathExtension: 'me',
    })) as ApiResponse<User>
    return data
  }
}
