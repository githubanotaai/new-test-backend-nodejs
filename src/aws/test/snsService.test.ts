import MessageDTO from "../dtos/messageDTO";
import SNSService from "../services/snsService";
import dotenv from "dotenv";
dotenv.config();

describe("SNSService", () => {
  let snsService: SNSService;

  beforeAll(() => {
    const topic = process.env.AWS_SNS_TOPIC_CATALOG_ARN ?? "";
    snsService = new SNSService(topic);
  });

  it("should publish a message", async () => {
    const messageDTO = new MessageDTO("Hello, World!");
    const result = await snsService.publish(messageDTO);

    expect(result).toBeDefined();
    expect(result.MessageId).toBeDefined();
  });
});
