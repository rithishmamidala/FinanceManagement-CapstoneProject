package com.example.Bills.controller;

import com.example.Bills.model.Bills;
import com.example.Bills.repository.BillsRepository;
import com.example.Bills.service.BillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin("*")
@RestController
@RequestMapping("/bills")
@CrossOrigin("*")
// replace with your frontend URL
public class BillsController {
    @Autowired
    private BillsService service;
    @PostMapping("/addbills")
    private Bills addBills(@RequestBody Bills bill){
        return service.addBills(bill);
    }
    @GetMapping("/getbills")
    private List<Bills> getAllBills(){
        return service.getAllBills();
    }
    @PutMapping("/update/{billId}")
    public Bills updateBillById(@PathVariable Long billId, @RequestBody Bills updatedBill) {
        return service.updateBillById(billId, updatedBill);
    }
    @DeleteMapping("/delete/{billId}")
    private void deleteBillById(@PathVariable Long billId){
        service.deleteBillById(billId);
    }


}
