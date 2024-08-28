package Capstone.TransactionHistory.Figen;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "accounts-service", url = "http://localhost:9099/api")
public interface Figen {

    @PutMapping("/accounts/updateBalance")
    void updateAccountBalance(@RequestParam("accountName") String accountName, @RequestParam("newBalance") Long newBalance);

    @GetMapping("/accounts/getBalance")
    Long getAccountBalance(@RequestParam("accountName") String accountName);

}
