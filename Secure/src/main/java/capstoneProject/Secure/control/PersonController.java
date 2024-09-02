package capstoneProject.Secure.control;

import capstoneProject.Secure.config.CustomUserDetails;
import capstoneProject.Secure.model.Person;
import capstoneProject.Secure.service.AuthService;
import capstoneProject.Secure.service.JwtService;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/person")
@CrossOrigin("*")
public class PersonController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String registerPerson(@RequestBody Person user) {
        user = authService.saveUser(user);
        return authService.generateToken(user.getUsername());
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> getToken(@RequestBody Person authRequest) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        if (authenticate.isAuthenticated()) {
            CustomUserDetails userCredential = (CustomUserDetails) authenticate.getPrincipal();
            String token = authService.generateToken(authRequest.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", token); // Include the token in the response

            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Invalid access");
        }
    }
//
@GetMapping("/validate")
public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
    try {
        // Validate the token
        authService.validateToken(token);

        // Extract username from the token
        String username = jwtService.extractUsername(token);

        // Return username if token is valid
        return ResponseEntity.ok(username);
    } catch (RuntimeException e) {
        // Return error message if token is invalid or expired
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    }
}



//    public String validateToken(@RequestParam("token") String token) {
//        authService.validateToken(token);
//        return "Token is valid";
//    }
}
