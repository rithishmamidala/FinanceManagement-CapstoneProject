package Capstone.TransactionHistory.service;

import Capstone.TransactionHistory.Figen.Figen;
import Capstone.TransactionHistory.Repository.repo;
import Capstone.TransactionHistory.model.Transactions;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Serve {
    @Autowired
    private Figen accountFeignClient;

    @Autowired
    private repo rep;

    @Transactional
    public void processTransaction(Transactions transaction) {

        rep.save(transaction);
        Long original = accountFeignClient.getAccountBalance(transaction.getAccountName());
        Long newBalance;
        if (transaction.getTransactionType().equalsIgnoreCase("credit")) {
            newBalance = original + transaction.getAmount();
        } else if (transaction.getTransactionType().equalsIgnoreCase("debit")) {
            newBalance = original - transaction.getAmount();
        } else {
            throw new IllegalArgumentException("Invalid transaction type");
        }
        accountFeignClient.updateAccountBalance(transaction.getAccountName(), newBalance);
    }

}
