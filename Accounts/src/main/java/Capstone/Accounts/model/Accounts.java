package Capstone.Accounts.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor


@Document
public class Accounts {
    @Id
    private Long id;
    private String AccountName;
    private String AccountNumber;
    private String CardType;
    private String CVV;
    private String Balance;

}
