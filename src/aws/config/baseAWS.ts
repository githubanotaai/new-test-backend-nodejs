import {fromEnv} from "@aws-sdk/credential-providers";

//Base AWS class
export default class BaseAWS {
  // protected accesskey = process.env.AWS_ACCESS_KEY_ID;
  // protected secretKey = process.env.AWS_SECRET_ACCESS_KEY;
  protected region = process.env.AWS_REGION;
  protected credentials;

  constructor() {
    this.credentials = fromEnv();
  }
}
