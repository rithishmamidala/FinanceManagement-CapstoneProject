package Capstone.Accounts.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Accounts {
    @Id
    private Long id;  // Primary key

    private String accountName;  //foreign key
    private String userName;
    private String accountNumber;
    private String cardType;
    private Long CVV;
    private Long balance;


}
