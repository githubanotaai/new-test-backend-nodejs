package tech.joelf.anotaai.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AMQPConfig {

    @Value("${amqp.queues.catalog.name}")
    private final String catalogQueue;

    public AMQPConfig(String catalogQueue) {
        this.catalogQueue = catalogQueue;
    }

    @Bean
    public Queue catalogQueue() {
        return new Queue(catalogQueue, Boolean.TRUE);
    }

    @Bean
    public RabbitTemplate catalogRabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }
}
