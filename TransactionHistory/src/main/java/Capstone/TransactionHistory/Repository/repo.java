package Capstone.TransactionHistory.Repository;

import Capstone.TransactionHistory.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface repo extends JpaRepository<Transactions,String> {

}
