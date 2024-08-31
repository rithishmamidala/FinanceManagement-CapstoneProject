package com.example.Bills.service;

import com.example.Bills.exception.BillNotFoundException;
import com.example.Bills.model.Bills;
import com.example.Bills.repository.BillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillsService {
    @Autowired
    private BillsRepository billrepo;
    public Bills addBills(Bills bill){
        return billrepo.save(bill);
    }
    public List<Bills> getAllBills(){
        return billrepo.findAll();
    }
    public Bills updateBillById(Long billId, Bills updatedBill) {
        Optional<Bills> existingBill = billrepo.findById(billId);

        if (existingBill.isPresent()) {
            Bills bill = existingBill.get();
            bill.setBillname(updatedBill.getBillname());
            bill.setItemdesc(updatedBill.getItemdesc());
            bill.setAmount(updatedBill.getAmount());
            bill.setDuedate(updatedBill.getDuedate());

            return billrepo.save(bill);
        } else {
            throw new BillNotFoundException("Bill with ID " + billId + " not found.");
        }
    }
    public void deleteBillById(Long billId) {
        if (billrepo.existsById(billId)) {
            billrepo.deleteById(billId);
        } else {
            throw new BillNotFoundException("Bill with ID " + billId + " not found.");
        }
    }
}
