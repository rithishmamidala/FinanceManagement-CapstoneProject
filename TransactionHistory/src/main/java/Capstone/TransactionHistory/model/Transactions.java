package Capstone.TransactionHistory.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Document
public class Transactions {
    @Id
    private String accountName; // Primary key
    private Long ItemId;
    private String Goal;
    private LocalDate date;
    private String amount;
}
