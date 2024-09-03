package Capstone.TransactionHistory.Repository;

import Capstone.TransactionHistory.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface repo extends JpaRepository<Transactions, Long> {
//    boolean existsByAccountNumber(String accountNumber);
    List<Transactions> findByUserName(String userName);
}
