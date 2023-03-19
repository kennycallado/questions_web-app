export type RoleInClaims = {
  id: number;
  name: string;
}

export type UserInClaims = {
  id: number;
  depends_on: number;
  role: RoleInClaims;
  user_token: string;
}

export type AuthUser = {
  user: UserInClaims;
  access_token: string;
}
