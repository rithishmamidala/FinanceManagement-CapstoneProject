package com.example.expensegoals.controller;

import com.example.expensegoals.model.Expensegoals;
import com.example.expensegoals.repository.ExpenseRepository;
import com.example.expensegoals.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/expense")
public class Controller {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ExpenseRepository repo;
    @PostMapping
    private Expensegoals addExpensegoals(@RequestBody Expensegoals goals){
        return expenseService.addExpensegoals(goals);

    }
    
    @GetMapping
    private List<Expensegoals> getAllGoals(){
        return repo.findAll();
    }
}
