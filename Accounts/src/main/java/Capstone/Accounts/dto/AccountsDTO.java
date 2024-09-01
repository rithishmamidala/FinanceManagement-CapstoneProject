package Capstone.Accounts.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountsDTO {

    @NotNull(message = "ID cannot be null")
    private Long id;

    @NotEmpty(message = "Account name is required")
    private String accountName;

    @NotEmpty(message = "Account number is required")
    @Pattern(regexp = "\\d{16}", message = "Account number must be a 16-digit number")
    private String accountNumber;

    @NotEmpty(message = "Card type is required")
    private String cardType;

    @NotEmpty(message = "CVV is required")
    @Pattern(regexp = "\\d{4}", message = "CVV must be a 4-digit number")
    private String CVV;

    @NotNull(message = "Balance cannot be null")
    @Min(value = 0, message = "Balance must be a positive number")
    private Long balance;

    // Getters and setters
}
