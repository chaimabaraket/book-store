package pl.zawadzki.bookstore.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.zawadzki.bookstore.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAllByOrderByIsFinishedAscCreatedAtDesc(Pageable pageable);
    Page<Order> findAllByIsFinishedOrderByCreatedAtDesc(boolean isFinished, Pageable pageable);
    Page<Order> findAllByBuyerEmailOrderByIsFinishedAscCreatedAtDesc(String buyerEmail, Pageable pageable);
    Page<Order> findAllByBuyerUsernameOrderByIsFinishedAscCreatedAtDesc(String buyerUsername, Pageable pageable);
}
