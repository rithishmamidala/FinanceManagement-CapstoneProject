package Capstone.TransactionHistory.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Transactions {
    @Id
    private String accountName; // Primary key
    private Long ItemId;
    private String Goal;
    private String transactionType;
    private LocalDate date;
    private Long amount;
}
