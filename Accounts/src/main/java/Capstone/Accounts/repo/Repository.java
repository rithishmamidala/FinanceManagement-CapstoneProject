package Capstone.Accounts.repo;

import Capstone.Accounts.model.Accounts;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface Repository extends ReactiveMongoRepository<Accounts,Long> {
    Mono<Accounts> findByAccountName(String accountName);
}
