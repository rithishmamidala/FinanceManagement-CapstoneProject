package com.example.expensegoals.controller;

import com.example.expensegoals.Figen.fig;
import com.example.expensegoals.model.Expensegoals;
import com.example.expensegoals.repository.ExpenseRepository;
import com.example.expensegoals.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/expense")
public class Controller {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ExpenseRepository repo;

    @Autowired
    private fig figen;

    @PostMapping
    public ResponseEntity<Expensegoals> addExpensegoals(@RequestBody Expensegoals goals) {
        Optional<Expensegoals> existingGoal = repo.findByGoalName(goals.getGoalName());

        if (existingGoal.isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            Expensegoals savedGoal = repo.save(goals);
            return new ResponseEntity<>(savedGoal, HttpStatus.CREATED);
        }
    }

    @GetMapping
    public ResponseEntity<List<Expensegoals>> getAllGoals(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String userName = figen.validateToken(token);
        if (userName != null) {
            List<Expensegoals> goals = repo.findByUserName(userName);
            return new ResponseEntity<>(goals, HttpStatus.OK);
        } else {
            // Handle case where token is invalid
            return new ResponseEntity<>(List.of(), HttpStatus.UNAUTHORIZED);
        }
    }
}
