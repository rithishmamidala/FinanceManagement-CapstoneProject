package com.example.Bills.repository;

import com.example.Bills.model.Bills;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillsRepository extends JpaRepository<Bills,Long> {
}
