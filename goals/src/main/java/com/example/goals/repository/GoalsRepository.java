package com.example.goals.repository;

import com.example.goals.model.Goals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalsRepository extends JpaRepository<Goals,String> {
}
