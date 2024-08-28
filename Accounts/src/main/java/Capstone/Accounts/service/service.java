//package Capstone.Accounts.service;
//
//import Capstone.Accounts.model.Accounts;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//import org.springframework.stereotype.Service;
//import reactor.core.publisher.Mono;
//
//@Service
//public class service {
//    @Autowired
//    private Repository repo;
//    public Mono<Accounts> updateBalance(String accountName, Double amount, String transactionType) {
//        return repo.findByAccountName(accountName)
//                .flatMap(account -> {
//                    if ("credit".equalsIgnoreCase(transactionType)) {
//                        account.setBalance(account.getBalance() + amount);
//                    } else if ("debit".equalsIgnoreCase(transactionType)) {
//                        account.setBalance(account.getBalance() - amount);
//                    }
//                    return accountRepository.save(account);
//                });
//    }
//
//
//
//
//}
