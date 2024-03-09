import { APIResponse, transform } from "./BaseRequest";
import { HTTPClient } from "./HttpClient";
import { AuthConfig } from "../config/axios";

interface IAuthResponse {
  token: string;
  email: string;
  refreshToken?: string;
}

export interface IRequestBody {
  email: string;
  password: string;
}

interface IAuthRequest {
  login(item: IRequestBody): Promise<APIResponse<IAuthResponse>>;
}

export class AuthRequest extends HTTPClient implements IAuthRequest {
  constructor() {
    super(AuthConfig);
  }

  public async login(item: IRequestBody): Promise<APIResponse<IAuthResponse>> {
    const instance = this.createInstance();
    return await instance.post("auth/login", item).then(transform);
  }
}
