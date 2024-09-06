package tech.joelf.anotaai.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import tech.joelf.anotaai.models.Owner;
import tech.joelf.anotaai.services.CatalogService;

@Component
public class CatalogConsumer {

    private final CatalogService catalogService;

    public CatalogConsumer(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @RabbitListener(queues = "${amqp.queues.catalog.name}")
    public void consumeOwner(@Payload Owner owner) {
        catalogService.generateCatalogByOwner(owner.getId());
    }
}
