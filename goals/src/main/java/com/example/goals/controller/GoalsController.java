package com.example.goals.controller;

import com.example.goals.model.Goals;
import com.example.goals.service.GoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/goals")

public class GoalsController {
    @Autowired
    private GoalsService goalsservice;
    @PostMapping("/addtarget")
    public Goals addTarget(@RequestBody Goals goals){
        return goalsservice.addTarget(goals);

    }
}
