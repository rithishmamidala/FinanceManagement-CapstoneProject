package Capstone.TransactionHistory.Control;

import Capstone.TransactionHistory.dto.TransactionsDTO;
import Capstone.TransactionHistory.model.Transactions;
import Capstone.TransactionHistory.service.Serve;
import Capstone.TransactionHistory.Repository.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/TransactionHistory")
public class controller {

    @Autowired
    private Serve serve;

    @Autowired
    private repo rep;

    @GetMapping
    public List<Transactions> getAllTransactions() {
        return rep.findAll();
    }

    @PostMapping
    public void processTransaction(@Valid @RequestBody TransactionsDTO transactionDTO) {
        // Convert DTO to Entity
        Transactions transaction = new Transactions();
        transaction.setAccountName(transaction.getAccountName());
        transaction.setItemId(transactionDTO.getItemId());
        transaction.setGoal(transactionDTO.getGoal());
        transaction.setTransactionType(transactionDTO.getTransactionType());
        transaction.setDate(transactionDTO.getDate());
        transaction.setAmount(transactionDTO.getAmount());

        serve.processTransaction(transaction);
    }
}
