package Capstone.Accounts.dto;

import jakarta.validation.constraints.*;
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

    @NotEmpty(message = "User name is required")
    private String userName;

    @NotEmpty(message = "Account number is required")
    @Pattern(regexp = "\\d{16}", message = "Account number must be a 16-digit number")
    private String accountNumber;

    @NotEmpty(message = "Card type is required")
    private String cardType;

    @NotNull(message = "CVV is required")
    @Min(value = 1000, message = "CVV must be a 4-digit number")
    @Max(value = 9999, message = "CVV must be a 4-digit number")
    private Long CVV;

    @NotNull(message = "Balance cannot be null")
    @Min(value = 0, message = "Balance must be a positive number")
    private Long balance;

}
