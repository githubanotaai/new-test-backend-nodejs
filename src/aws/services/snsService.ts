import {PublishCommand, SNSClient} from "@aws-sdk/client-sns";
import BaseAWS from "../config/baseAWS";
import MessageDTO from "../dtos/messageDTO";

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

  async publish(messageDTO: MessageDTO): Promise<{MessageId: string}> {
    const params = {
      Message: messageDTO.message,
      TopicArn: this.topic,
    };

    try {
      const data = await this.snsClient.send(new PublishCommand(params));
      console.log("Message sent. ID: ", data.MessageId);
      if (data.MessageId) {
        return {MessageId: data.MessageId};
      } else {
        throw new Error("MessageId is undefined");
      }
    } catch (err) {
      if (err instanceof Error) console.error(err, err.stack);
      throw err;
    }
  }
}
