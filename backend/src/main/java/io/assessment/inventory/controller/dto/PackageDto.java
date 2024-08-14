package io.assessment.inventory.controller.dto;

import lombok.ToString;

@ToString
public class PackageDto {
    private String packageName;
    private String address;
    private Long quantity;
    private Double pricePerUnit;
    private Long supplierId;


    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
    public Double getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(Double pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public Long getSupplier_id() {
        return supplierId;
    }

    public void setSupplierId(Long supplier_id) {
        this.supplierId = supplier_id;
    }

}
