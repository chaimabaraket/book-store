package pl.zawadzki.bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.zawadzki.bookstore.dto.PasswordDto;
import pl.zawadzki.bookstore.dto.UserDto;
import pl.zawadzki.bookstore.model.User;
import pl.zawadzki.bookstore.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    private UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<User> getUserInfo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.getUserInfo());
    }

    @PostMapping("/update")
    public ResponseEntity updateUser(@RequestBody UserDto userDto) {
        service.updateUserInfo(userDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/changePassword")
    public ResponseEntity changePassword(@RequestBody PasswordDto passwordDto) {
        if(service.changePassword(passwordDto)){
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity catchUserException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("Info: " + ex.getMessage()).build();
    }
}
