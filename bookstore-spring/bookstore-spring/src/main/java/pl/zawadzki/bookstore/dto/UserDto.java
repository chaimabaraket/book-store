package pl.zawadzki.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    @NotEmpty
    private Long userId;
    
    @NotBlank(message = "Username is required")
    private String username;

    @NotEmpty(message = "Password is required")
    @Size(min = 5, message = "Password must contain at least 5 characters")
    private String password;

    @Email
    @NotEmpty(message = "Email is required")
    private String email;

    @Pattern(regexp = "\\d{9}")
    @NotEmpty
    private String phone;

    @NotEmpty
    private String address;
}
