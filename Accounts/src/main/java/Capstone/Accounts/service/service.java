package Capstone.Accounts.service;

import Capstone.Accounts.Figen.fig;
import Capstone.Accounts.model.Accounts;
import Capstone.Accounts.repo.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class service {
    @Autowired
    private fig figen;

    @Autowired
    private Repository accountRepository;

    public List<Accounts> validate(String token) {
        String result = figen.validateToken(token);
        if (result != null) {
            return accountRepository.findByAccountName(result);
        } else {
            // Handle case where token is invalid
            return List.of(); // or throw an appropriate exception
        }
    }
}
