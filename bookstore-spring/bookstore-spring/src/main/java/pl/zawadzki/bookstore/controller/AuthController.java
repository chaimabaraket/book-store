package pl.zawadzki.bookstore.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.zawadzki.bookstore.dto.LoginRequest;
import pl.zawadzki.bookstore.dto.LoginResponse;
import pl.zawadzki.bookstore.dto.RegisterRequest;
import pl.zawadzki.bookstore.service.LoginService;
import pl.zawadzki.bookstore.service.RegisterService;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin
public class AuthController {

    private final RegisterService registerService;
    private final LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<String> registerNewUser(@RequestBody RegisterRequest registerRequest){
        return registerService.signUp(registerRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(loginService.login(loginRequest));
    }
}
