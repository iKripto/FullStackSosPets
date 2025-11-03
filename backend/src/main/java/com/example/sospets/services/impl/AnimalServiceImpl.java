package com.example.sospets.services.impl;

import com.example.sospets.entities.Animal;
import com.example.sospets.entities.Cor;
import com.example.sospets.entities.Tutor; // 1. Importar o Tutor
import com.example.sospets.enums.Especie;
import com.example.sospets.repositories.AnimalRepo;
import com.example.sospets.repositories.CorRepo;
import com.example.sospets.repositories.TutorRepo; // 2. Importar o TutorRepo
import com.example.sospets.services.AnimalService;
import com.example.sospets.services.exceptions.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalServiceImpl implements AnimalService {

    @Autowired
    private AnimalRepo repository;

    @Autowired
    private CorRepo corRepo;

    @Autowired
    private TutorRepo tutorRepo; // 3. Adicionar o repositório do Tutor

    @Autowired
    private ModelMapper mapper;

    @Override
    public Animal create(Animal animal) {
        // Busca a Cor (como já fazia)
        Cor cor = corRepo.findById(animal.getCor().getId())
                .orElseThrow(() -> new ObjectNotFoundException("Cor não encontrada"));
        animal.setCor(cor);

        // 4. ADICIONAR ESTA LÓGICA PARA BUSCAR O TUTOR
        // Verifica se um tutor foi informado (pode ser nulo)
        if (animal.getTutor() != null && animal.getTutor().getCpf() != null) {
            Tutor tutor = tutorRepo.findByCpf(animal.getTutor().getCpf())
                    .orElseThrow(() -> new ObjectNotFoundException("Tutor não encontrado"));
            animal.setTutor(tutor);
        } else {
            animal.setTutor(null); // Garante que, se não veio, é nulo
        }

        return repository.save(mapper.map(animal, Animal.class));
    }

    public List<Animal> findAll() {
        return repository.findAll();
    }

    @Override
    public Animal findById(Integer id) {
        Optional<Animal> animal = repository.findById(id);
        return animal.orElseThrow(()-> new ObjectNotFoundException("Animal não encontrado"));
    }

    @Override
    public List<Animal> findByNomeContainingIgnoreCase(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public List<Animal> findByNomeContainingIgnoreCaseAndEspecie(String nome, Especie especie) {
        return repository.findByNomeContainingIgnoreCaseAndEspecie(nome, especie);
    }

    @Override
    public List<Animal> findByEspecieOrderByNomeDesc(Especie especie) {
        return repository.findByEspecieOrderByNomeDesc(especie);
    }

    @Override
    public Animal update(Animal animal) {
        // (No futuro, a lógica de update precisará ser igual à de create,
        // buscando Cor e Tutor antes de salvar)
        return repository.save(mapper.map(animal, Animal.class));
    }

    public void delete(Integer id){
        findById(id);
        repository.deleteById(id);
    }
}