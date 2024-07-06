package pl.zawadzki.bookstore.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@Table(name = "orders")
public class Order implements Serializable {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "order")
    private Set<CartItem> cartItems = new HashSet<>();

    @NotNull
    private BigDecimal finalPrice;

    @NotNull
    private boolean isFinished;

    /** Buyer info */

    @NotEmpty(message = "Username is required")
    private String buyerUsername;

    @NotEmpty(message = "Email is required")
    private String buyerEmail;

    @Pattern(regexp = "\\d{9}")
    @NotEmpty
    private String buyerPhone;

    @NotEmpty
    private String buyerAddress;

    public Order(User buyer) {
        this.buyerUsername = buyer.getUsername();
        this.buyerEmail = buyer.getEmail();
        this.buyerPhone = buyer.getPhone();
        this.buyerAddress = buyer.getAddress();
        this.isFinished = false;
        this.finalPrice = buyer.getCart().getCartItems().stream().map(cartItem -> cartItem.getPrice()
                .multiply(new BigDecimal(cartItem.getQuantity())))
                .reduce(BigDecimal::add)
                .orElse(new BigDecimal(0));
    }
}
