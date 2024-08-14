package io.assessment.inventory.controller.dto;

public class PriceResponseDto {
    private Double totalPriceBeforeDiscount;
    private Double totalPriceAfterDiscount;
    private Double discount;
    public PriceResponseDto(Double totalPriceBeforeDiscount, Double totalPriceAfterDiscount, Double discount) {
        this.totalPriceBeforeDiscount = totalPriceBeforeDiscount;
        this.totalPriceAfterDiscount = totalPriceAfterDiscount;
        this.discount = discount;
    }
    public Double getTotalPriceBeforeDiscount() {
        return totalPriceBeforeDiscount;
    }
    public void setTotalPriceBeforeDiscount(Double totalPriceBeforeDiscount) {
        this.totalPriceBeforeDiscount = totalPriceBeforeDiscount;
    }
    public Double getTotalPriceAfterDiscount() {
        return totalPriceAfterDiscount;
    }
    public void setTotalPriceAfterDiscount(Double totalPriceAfterDiscount) {
        this.totalPriceAfterDiscount = totalPriceAfterDiscount;
    }
    public Double getDiscount() {
        return discount;
    }
    public void setDiscount(Double discount) {
        this.discount = discount;
    }
    

}
