package com.example.goals.service;

import com.example.goals.model.Goals;
import com.example.goals.repository.GoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalsService {
    @Autowired
    private GoalsRepository goalsRepository;
    public Goals addTarget(Goals goals){
        return goalsRepository.save(goals);
    }
}
