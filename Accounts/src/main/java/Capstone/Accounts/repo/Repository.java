package Capstone.Accounts.repo;

import Capstone.Accounts.model.Accounts;


import org.springframework.data.jpa.repository.JpaRepository;


public interface Repository extends JpaRepository<Accounts,Long> {
    Accounts findByAccountName(String accountName);
}
