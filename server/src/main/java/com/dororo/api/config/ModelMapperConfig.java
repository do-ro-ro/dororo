package com.dororo.api.config;

import com.dororo.api.commnunity.dto.response.PostDetailsDto;
import com.dororo.api.db.entity.PostEntity;
import org.geolatte.geom.M;
import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // PostEntity에서 PostDetailsDto로의 매핑 규칙을 정의
        modelMapper.addMappings(new PropertyMap<PostEntity, PostDetailsDto>() {
            @Override
            protected void configure() {
                map().setMapId(source.getMapId().getMapId()); // MapEntity의 mapId를 추출하여 설정
                map().setUserName(source.getMapId().getUserId().getName());
            }
        });

        return modelMapper;
    }

    @Bean
    public GeometryFactory geometryFactory() {
        return new GeometryFactory();
    }
}
