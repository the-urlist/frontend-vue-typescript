interface IUserClaim {
  typ: string;
  val: string;
}

interface IAuthResponse {
  provider_name: string;
  user_claims: Array<IUserClaim>;
  user_id: string;
}

export { IAuthResponse, IUserClaim };
