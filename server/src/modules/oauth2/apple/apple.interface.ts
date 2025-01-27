type GrantType = 'authorization_code';
type ResponseType = 'code' | 'id_token';
type ResponseMode = 'form_post';
type Scope = 'email' | 'name';

export interface AppleTokenRequest {
  grant_type: GrantType[];
  code: string;
  redirect_uri: string;
  client_id: string;
  login_hint: string;
}

export interface AppleAuthRequest {
  response_type: ResponseType[];
  client_id: string;
  redirect_uri: string;
  state: string;
  scope: Scope[];
  response_mode: ResponseMode[];
}

export interface AppleCredentialsResponse {
  token_type: string;
  scope: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
}

export class GoogleUserInfo {
  id: string;
  email: string;
  verified_email: string;
  picture: string;
}
