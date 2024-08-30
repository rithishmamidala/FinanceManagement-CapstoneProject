package Capstone.TransactionHistory.Control;

import Capstone.TransactionHistory.Repository.repo;
import Capstone.TransactionHistory.model.Transactions;
import Capstone.TransactionHistory.service.Serve;
import jakarta.transaction.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Transactions> getAllTransactions()
    {
        return rep.findAll();
    }

    @PostMapping
    public void processTransaction(@RequestBody Transactions transaction) {
        serve.processTransaction(transaction);

    }
}