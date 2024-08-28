package Capstone.Accounts.controller;

import Capstone.Accounts.model.Accounts;
import Capstone.Accounts.repo.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin("*")

@RestController
@RequestMapping("/api")
public class Control {
    @Autowired
    private Repository repo;

    @PostMapping
    public Mono<Accounts> add(@RequestBody Accounts account)
    {
        return repo.save(account);
    }
    @GetMapping
    public Flux<Accounts> getAllAccounts() {
        return repo.findAll();
}

}
