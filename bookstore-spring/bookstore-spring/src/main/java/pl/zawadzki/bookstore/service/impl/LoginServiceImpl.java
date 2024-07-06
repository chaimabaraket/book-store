package pl.zawadzki.bookstore.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.zawadzki.bookstore.dto.LoginRequest;
import pl.zawadzki.bookstore.dto.LoginResponse;
import pl.zawadzki.bookstore.service.LoginService;
import pl.zawadzki.bookstore.util.JwtUtil;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    /**
     * Authenticates {@link pl.zawadzki.bookstore.model.User} with {@link LoginRequest}
     *
     * @param loginRequest {@link LoginRequest}
     * @return {@link LoginResponse}
     */
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(authentication);
        return new LoginResponse(token, loginRequest.getUsername());
    }
}
