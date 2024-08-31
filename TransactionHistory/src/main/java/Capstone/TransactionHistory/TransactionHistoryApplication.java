package Capstone.TransactionHistory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class TransactionHistoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(TransactionHistoryApplication.class, args);
	}

}
