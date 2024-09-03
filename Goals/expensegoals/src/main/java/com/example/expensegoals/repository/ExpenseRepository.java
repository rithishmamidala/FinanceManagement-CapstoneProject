package com.example.expensegoals.repository;

import com.example.expensegoals.model.Expensegoals;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expensegoals,String> {
    List<Expensegoals> findByUserName(String userName);
    Optional<Expensegoals> findByGoalName (String goal);
}
