export interface GetAuthenticationToken {
  get(): Promise<GetAuthenticationToken.Model>;
}

export namespace GetAuthenticationToken {
  export type Model = {
    expiresIn: number;
    accessToken: string;
  };
}
