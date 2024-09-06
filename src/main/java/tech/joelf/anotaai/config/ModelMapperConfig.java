package tech.joelf.anotaai.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import tech.joelf.anotaai.dtos.request.CreateCategoryDtoIn;
import tech.joelf.anotaai.models.Category;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.createTypeMap(CreateCategoryDtoIn.class, Category.class)
                .addMapping(CreateCategoryDtoIn::getTitle, Category::setTitle)
                .addMapping(CreateCategoryDtoIn::getDescription, Category::setDescription);
        return modelMapper;
    }
}
