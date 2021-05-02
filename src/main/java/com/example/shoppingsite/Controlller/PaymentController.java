//package com.example.shoppingsite.Controlller;
//
//import com.example.shoppingsite.Model.Payment;
//import com.example.shoppingsite.Repository.paymentRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.net.URI;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//public class paymentController {
//
//    @Autowired
//    private paymentRepository PaymentRepository;
//
//    @GetMapping("/payments")
//    public List<Payment> getAllPayments() {
//        return PaymentRepository.findAll();
//    }
//
//    @GetMapping("/payments/{studentId}")
//    public List<Payment> getPayments(@PathVariable String studentId) {
//        return PaymentRepository.findByCustomerID(studentId);
//    }
//
//    @GetMapping("/payment/{Id}")
//    public Optional<Payment> getPayment(@PathVariable long Id) {
//        return PaymentRepository.findById(Id);
//    }
//
//
//    @PostMapping("/payments/insert")
//    public ResponseEntity<Void> insertPayment(@RequestBody Payment payment) {
//        Payment created = PaymentRepository.save(payment);
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.getPaymentID()).toUri();
//
//        return ResponseEntity.created(uri).build();
//    }
//
//
//    @DeleteMapping("/payments/{paymentID}")
//    public ResponseEntity<?> deletePayment(@PathVariable Long paymentID) {
//
//        PaymentRepository.deleteById(paymentID);
//        return ResponseEntity.noContent().build();
//
//
//    }
//
//    @PutMapping("/payments")
//    public ResponseEntity<Payment> updatePayments(@RequestBody Payment payment) {
//
//        Payment result = PaymentRepository.save(payment);
//        return new ResponseEntity<Payment>(payment, HttpStatus.OK);
//    }
//
//
//    @GetMapping("/payments/search/{searchText}")
//    public List<Payment> searchPayment(@PathVariable String searchText) {
//        return PaymentRepository.searchQuery(searchText);
//    }
//
//
////	@GetMapping("/reports/{studentID}")
////	public String exportReport(@PathVariable String studentID) throws FileNotFoundException, JRException {
////		return service.exportReport(studentID);
////	}
//
//}
