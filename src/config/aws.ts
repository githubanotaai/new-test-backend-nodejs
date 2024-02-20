import AWS from "aws-sdk";

export const awsLoadSettings = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  AWS.config.getCredentials((err) => {
    if (err) console.log(err.stack);
    else {
      console.warn("Access key: ", AWS.config.credentials?.accessKeyId);
      console.warn(
        "Secret Access key: ",
        AWS.config.credentials?.secretAccessKey
      );
      console.warn("Regin: ", AWS.config.region);
      //console.log("SNS_TOPIC_CATALOG_ARN: ", AWS.config.sns.)
    }
  });
};
