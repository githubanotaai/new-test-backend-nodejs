package tech.joelf.anotaai.publishers;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import tech.joelf.anotaai.models.Owner;

public class OwnerPublisher {

    private final Queue ownerQueue;
    private final RabbitTemplate rabbitTemplate;

    public OwnerPublisher(Queue ownerQueue, RabbitTemplate rabbitTemplate) {
        this.ownerQueue = ownerQueue;
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publish(Owner owner) {
        rabbitTemplate.convertAndSend(ownerQueue.getName(), owner);
    }
}
