package tech.joelf.anotaai.config;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class AMQPConfig {

    @Value("${amqp.queues.owner.name}")
    private final String ownerQueue;

    public AMQPConfig(String ownerQueue) {
        this.ownerQueue = ownerQueue;
    }

    @Bean
    public Queue ownerQueue() {
        return new Queue(ownerQueue, Boolean.TRUE);
    }
}
