package com.example.expensegoals.repository;

import com.example.expensegoals.model.Expensegoals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expensegoals,String> {
}
