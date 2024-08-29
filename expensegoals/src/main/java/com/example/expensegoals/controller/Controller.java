package com.example.expensegoals.controller;

import com.example.expensegoals.model.Expensegoals;
import com.example.expensegoals.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expense")
public class Controller {
    @Autowired
    private ExpenseService expenseService;
    @PostMapping("/add")
    private Expensegoals addExpensegoals(@RequestBody Expensegoals goals){
        return expenseService.addExpensegoals(goals);

    }
}
