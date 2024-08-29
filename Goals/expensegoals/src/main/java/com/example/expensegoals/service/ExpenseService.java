package com.example.expensegoals.service;

import com.example.expensegoals.model.Expensegoals;
import com.example.expensegoals.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository goalsRepository;
    public Expensegoals addExpensegoals(Expensegoals goals){
        return goalsRepository.save(goals);
    }
}
