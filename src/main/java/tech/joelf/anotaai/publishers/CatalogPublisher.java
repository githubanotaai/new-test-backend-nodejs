package tech.joelf.anotaai.publishers;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import tech.joelf.anotaai.models.Owner;

@Component
public class CatalogPublisher {

    private final Queue catalogQueue;
    private final RabbitTemplate catalogRabbitTemplate;

    public CatalogPublisher(Queue catalogQueue, RabbitTemplate catalogRabbitTemplate) {
        this.catalogQueue = catalogQueue;
        this.catalogRabbitTemplate = catalogRabbitTemplate;
    }

    public void publish(Owner owner) {
        catalogRabbitTemplate.convertAndSend(catalogQueue.getName(), owner);
    }
}
