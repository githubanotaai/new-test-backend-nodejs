import {PublishCommand, SNSClient} from "@aws-sdk/client-sns";
import BaseAWS from "../config/baseAWS";
import MessageDTO from "../DTO/messageDTO";

export default class SNSService extends BaseAWS {
  private snsClient: SNSClient;
  private topic: string;

  constructor(topic: string) {
    super();
    this.snsClient = this.SNSClientBuilder();
    this.topic = topic;
  }

  private SNSClientBuilder(): SNSClient {
    const snsClient = new SNSClient({
      region: this.region,
      credentials: this.credentials,
    });
    return snsClient;
  }

  async publish(messageDTO: MessageDTO) {
    const params = {
      Message: messageDTO.message,
      TopicArn: this.topic,
    };

    try {
      const data = await this.snsClient.send(new PublishCommand(params));
      console.log("Message sent. ID: ", data.MessageId);
    } catch (err) {
      if (err instanceof Error) console.error(err, err.stack);
    }
  }
}

export const sns_test = () => {
  const topic = process.env.AWS_SNS_TOPIC_CATALOG_ARN ?? "";
  const snsService = new SNSService(topic);
  snsService.publish(new MessageDTO("Hello, World!"));
};
