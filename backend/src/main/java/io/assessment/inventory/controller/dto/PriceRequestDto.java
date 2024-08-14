package io.assessment.inventory.controller.dto;

public class PriceRequestDto {
    private Long id;
    private Long quantity;
    

    public PriceRequestDto(Long id, Long quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    
}
