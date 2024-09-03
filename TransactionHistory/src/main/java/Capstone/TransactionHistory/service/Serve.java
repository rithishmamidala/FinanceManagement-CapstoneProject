package Capstone.TransactionHistory.service;

import Capstone.TransactionHistory.Figen.Figen;
import Capstone.TransactionHistory.Figen.SecureFigen;
import Capstone.TransactionHistory.Repository.repo;
import Capstone.TransactionHistory.model.Transactions;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Serve {
    @Autowired
    private Figen accountFeignClient;

    @Autowired
    private SecureFigen secureFigen;

    @Autowired
    private repo rep;

    @Transactional
    public void processTransaction(Transactions transaction) {

        rep.save(transaction);

        Long original = accountFeignClient.getBalance(transaction.getAccountName());
        Long newBalance;

        if (transaction.getTransactionType().equalsIgnoreCase("credit")) {
            newBalance = original + transaction.getAmount();}
        else if (transaction.getTransactionType().equalsIgnoreCase("debit")) {
            newBalance = original - transaction.getAmount();
        } else {
            throw new IllegalArgumentException("Invalid transaction type");
        }
        accountFeignClient.updateBalance(transaction.getAccountName(), newBalance);
    }
    public List<Transactions> validate(String token) {
        String result = secureFigen.validateToken(token);
        if (result != null) {
            return rep.findByUserName(result);
        } else {
            // Handle case where token is invalid
            return List.of(); // or throw an appropriate exception
        }
    }

}