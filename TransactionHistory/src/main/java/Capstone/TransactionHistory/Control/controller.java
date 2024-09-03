package Capstone.TransactionHistory.Control;


import Capstone.TransactionHistory.model.Transactions;
import Capstone.TransactionHistory.service.Serve;
import Capstone.TransactionHistory.Repository.repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
    public List<Transactions> validate(@RequestHeader(HttpHeaders.AUTHORIZATION) String token)
    {
        return serve.validate(token);
    }

    @PostMapping
    public void processTransaction( @RequestBody Transactions transaction) {

        serve.processTransaction(transaction);
    }
}