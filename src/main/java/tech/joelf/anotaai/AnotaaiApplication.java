package tech.joelf.anotaai;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableRabbit
@SpringBootApplication
public class AnotaaiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnotaaiApplication.class, args);
	}
}
