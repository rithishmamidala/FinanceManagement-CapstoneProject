package com.example.expensegoals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ExpensegoalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpensegoalsApplication.class, args);
	}

}
