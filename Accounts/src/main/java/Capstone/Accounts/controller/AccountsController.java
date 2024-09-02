package Capstone.Accounts.controller;

import Capstone.Accounts.dto.AccountsDTO;
import Capstone.Accounts.model.Accounts;
import Capstone.Accounts.repo.Repository;
import Capstone.Accounts.service.service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
@Validated
public class AccountsController {

    @Autowired
    private Repository repo;

    @Autowired
    private service serve;

    @PostMapping
    public ResponseEntity<Accounts> add(@Valid @RequestBody AccountsDTO accountDTO) {
        Accounts account = new Accounts(
                accountDTO.getId(),
                accountDTO.getUserName(),
                accountDTO.getAccountName(),
                accountDTO.getAccountNumber(),
                accountDTO.getCardType(),
                accountDTO.getCVV(),
                accountDTO.getBalance()
        );
        return new ResponseEntity<>(repo.save(account), HttpStatus.CREATED);
    }


    @PutMapping("/accounts/updateBalance")
    public void updateBalance(@RequestParam("accountName") String accountName, @RequestParam("newBalance") Long newBalance) {
        Accounts account = repo.findByAccountName(accountName);
        if (account != null) {
            account.setBalance(newBalance);
            repo.save(account);


        }
    }

    @GetMapping("/accounts/getBalance")
    public Long getBalance(@RequestParam("accountName") String accountName) {
        Accounts account = repo.findByAccountName(accountName);
        if (account != null) {
            return account.getBalance();
        } else {
            return null;
        }
    }

    @GetMapping
    public List<Accounts> validate(@RequestHeader(HttpHeaders.AUTHORIZATION) String token)
    {
        return serve.validate(token);
    }
}
