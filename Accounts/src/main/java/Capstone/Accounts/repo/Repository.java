package Capstone.Accounts.repo;

import Capstone.Accounts.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface Repository extends JpaRepository<Accounts, Long> {

    List<Accounts> findByUserName(String userName);


    Accounts findByAccountName(String accountName);
    Optional<Accounts> findByAccountNumber(String accountNumber); // Specify the parameter type as String
}
