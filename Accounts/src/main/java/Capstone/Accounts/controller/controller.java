package Capstone.Accounts.controller;


import Capstone.Accounts.model.Accounts;
import Capstone.Accounts.repo.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class controller {
    @Autowired
    private Repository repo;
    @PostMapping
    public Accounts add(@RequestBody Accounts account)
    {
        return repo.save(account);
    }
    @GetMapping
    public List<Accounts> getAllAccounts() {
        return repo.findAll();
    }
    @PutMapping("/accounts/updateBalance")
    public void updateBalance(@RequestParam("accountName") String accountName, @RequestParam("newBalance") Long newBalance) {
        Accounts account = repo.findByAccountName(accountName);
        if (account != null) {
            account.setBalance(newBalance);
            repo.save(account);
        } else {
            throw new IllegalArgumentException("Account not found");
        }
    }
    @GetMapping("/accounts/getBalance")
    public Long getBalance(@RequestParam("accountName") String accountName) {
        Accounts account = repo.findByAccountName(accountName);
        if (account != null) {
            return account.getBalance();
        } else {
            throw new IllegalArgumentException("Account not found");
        }
    }

}








