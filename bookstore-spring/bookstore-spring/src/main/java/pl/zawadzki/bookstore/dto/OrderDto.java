package pl.zawadzki.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {
    private Long orderId;
    private BigDecimal finalPrice = new BigDecimal(0);
    private boolean finished;
    private Integer numberOfCartItems;

}
