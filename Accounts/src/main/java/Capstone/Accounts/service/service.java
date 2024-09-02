package Capstone.Accounts.service;

import Capstone.Accounts.Figen.fig;
import Capstone.Accounts.model.Accounts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

@Service
public class service {
    @Autowired
    private fig figen;

    public String validate(@RequestParam("token") String token) {
        String result = figen.validateToken(token);
        if (result == null) {
            return "Invalid token";
        }
        else{
            return result;
        }
    }
}








