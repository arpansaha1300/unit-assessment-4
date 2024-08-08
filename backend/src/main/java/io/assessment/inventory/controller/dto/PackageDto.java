package io.assessment.inventory.controller.dto;

import lombok.ToString;

@ToString
public class PackageDto {
    private String packageName;
    private String Address;
    private Long quantity;
    private Long supplierId;

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public Long getSupplier_id() {
        return supplierId;
    }

    public void setSupplierId(Long supplier_id) {
        this.supplierId = supplier_id;
    }

}
