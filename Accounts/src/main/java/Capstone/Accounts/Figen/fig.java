package Capstone.Accounts.Figen;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "accounts-service", url = "http://localhost:7000/person")
public interface fig {

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token);

}
