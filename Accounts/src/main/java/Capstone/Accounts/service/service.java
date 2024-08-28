package Capstone.Accounts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class service {
    @Autowired
    private Repository repo;
    public Mono<Account> updateBalance(String accountName, Double amount, String transactionType) {
        return accountRepository.findByAccountName(accountName)
                .flatMap(account -> {
                    if ("credit".equalsIgnoreCase(transactionType)) {
                        account.setBalance(account.getBalance() + amount);
                    } else if ("debit".equalsIgnoreCase(transactionType)) {
                        account.setBalance(account.getBalance() - amount);
                    }
                    return accountRepository.save(account);
                });
    }




}
