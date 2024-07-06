package pl.zawadzki.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    @NotEmpty
    private Long bookId;
    @Min(value = 1)
    private int quantity;
}
