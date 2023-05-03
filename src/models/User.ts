import { IAuthResponse } from "@/models/IAuthResponse";

export default class User {
  userName: string = "";
  name: string = "Login / Sign Up";
  loggedIn: boolean = false;
  profileImage: string = "";

  constructor(response?: IAuthResponse) {
    if (response) {
      this.loggedIn = true;
      // store just the username part of the email address
      this.userName = response.user_id.split("@")[0];

      for (let claim of response.user_claims) {
        if (claim.typ.indexOf("/identity/claims/name") > 0) {
          // store just the username part of the email address
          this.name = claim.val;
        }

        if (claim.typ.indexOf("profile_image_url_https") > 0) {
          this.profileImage = claim.val;
        }

        if (claim.typ.indexOf("urn:github:avatar_url") > 0) {
          this.profileImage = claim.val;
        }
      }
    }
  }
}
