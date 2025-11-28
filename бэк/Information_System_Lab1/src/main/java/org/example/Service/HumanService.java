package org.example.Service;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import org.example.DTO.HumanDto;
import org.example.Entity.Human;
import org.example.Mapper.HumanMapper;
import org.example.Repository.HumanRepository;

import java.util.List;
import java.util.stream.Collectors;

@RequestScoped
public class HumanService {
    @Inject
    HumanMapper humanMapper;
    @Inject
    HumanRepository humanRepository;

    public HumanDto addHuman(HumanDto humanDto) {
        Human human = humanMapper.toEntity(humanDto);
        humanRepository.save(human);
        return humanDto;
    }

    public List<HumanDto> loadAllHumans() {
        List<Human> humans = humanRepository.findAll();
        return humans.stream().map(humanMapper::toDto).collect(Collectors.toList());
    }
}
