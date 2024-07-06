package pl.zawadzki.bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @NotNull
    private boolean isActive;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @NotEmpty
    private String role = "ROLE_USER";

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Cart cart;

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                ", role='" + role + '\'' +
                ", cart=" + cart +
                '}';
    }
}
