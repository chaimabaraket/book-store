package pl.zawadzki.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordDto {
    @NotEmpty(message = "Password is required")
    @Size(min = 5, message = "Password must contain at least 5 characters")
    private String oldPassword;

    @NotEmpty(message = "Password is required")
    @Size(min = 5, message = "Password must contain at least 5 characters")
    private String newPassword;
}
