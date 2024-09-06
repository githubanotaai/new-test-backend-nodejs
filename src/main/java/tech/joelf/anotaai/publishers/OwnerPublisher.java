package tech.joelf.anotaai.publishers;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import tech.joelf.anotaai.models.Owner;

public class OwnerPublisher {

    private final Queue ownerQueue;
    private final RabbitTemplate ownerRabbitTemplate;

    public OwnerPublisher(Queue ownerQueue, RabbitTemplate ownerRabbitTemplate) {
        this.ownerQueue = ownerQueue;
        this.ownerRabbitTemplate = ownerRabbitTemplate;
    }

    public void publish(Owner owner) {
        ownerRabbitTemplate.convertAndSend(ownerQueue.getName(), owner);
    }
}
