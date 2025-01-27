type Scope = 'email' | 'profile' | 'openid';
type GrantType = 'authorization_code' | 'refresh_token';
type ResponseType = 'code';
type AccessType = 'offline';

export interface GoogleAuthRequest {
  client_id: string;
  redirect_uri: string;
  response_type: ResponseType[];
  scope: Scope[];
  state: string;
  access_type: AccessType[];
  include_granted_scopes?: boolean;
}

export interface GoogleTokenRequestByCode {
  grant_type: GrantType[];
  client_id: string;
  redirect_uri: string;
  client_secret: string;
  code: string;
  scope: Scope[];
}

export interface GoogleTokenRequestByRefreshToken {
  grant_type: GrantType[];
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

export interface GoogleCredentialsResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}

export class GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export class GoogleTokenVerificationInfo {
  azp: string;
  aud: string;
  sub: string;
  scope: string;
  exp: string;
  expires_in: string;
  email: string;
  email_verified: string;
  access_type: string;
}
