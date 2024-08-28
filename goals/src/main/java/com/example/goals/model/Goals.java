package com.example.goals.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; // Correct import for JPA
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Goals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generate ID values
    private Long goalId;

    private float targetachieved;
    private float thisMonthTarget;
    private Date startDate;
    private Date endDate; // Corrected the typo here
}
