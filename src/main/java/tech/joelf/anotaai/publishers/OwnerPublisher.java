package tech.joelf.anotaai.publishers;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import tech.joelf.anotaai.models.Owner;

@Component
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
