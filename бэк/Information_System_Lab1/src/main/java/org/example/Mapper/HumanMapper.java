package org.example.Mapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.example.DTO.HumanDto;
import org.example.Entity.Human;

@ApplicationScoped
public class HumanMapper {

    public Human toEntity(HumanDto humanDto) {
        Human human = new Human();
        human.setHeight(humanDto.getHeight());
        return human;
    }

    public HumanDto toDto(Human human) {
        HumanDto humanDto = new HumanDto();
        humanDto.setId(human.getId());
        humanDto.setHeight(human.getHeight());
        return humanDto;
    }
}
