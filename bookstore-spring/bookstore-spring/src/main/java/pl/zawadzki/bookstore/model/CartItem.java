package pl.zawadzki.bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CartItem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Order order;

    @NotEmpty
    private Long bookId;

    @NotEmpty
    private String bookTitle;

    @NotEmpty
    private String bookAuthor;

    @NotNull
    private BigDecimal price;

    @Min(1)
    private int quantity;

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", bookId=" + bookId +
                ", bookTitle=" + bookTitle +
                ", bookAuthor=" + bookAuthor +
                ", price=" + price +
                ", quantity=" + quantity +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CartItem cartItem = (CartItem) o;
        return quantity == cartItem.quantity &&
                Objects.equals(id, cartItem.id) &&
                Objects.equals(price,cartItem.price) &&
                Objects.equals(bookTitle,cartItem.bookTitle) &&
                Objects.equals(bookAuthor,cartItem.bookAuthor) &&
                Objects.equals(bookId, cartItem.bookId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, bookId, bookTitle, bookAuthor,quantity, price);
    }
}
