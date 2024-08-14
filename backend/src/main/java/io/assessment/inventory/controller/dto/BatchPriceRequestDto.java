package io.assessment.inventory.controller.dto;

import java.util.List;

public class BatchPriceRequestDto {
    private List<PriceRequestDto> packages;

    public List<PriceRequestDto> getPackages() {
        return packages;
    }

    public void setPackages(List<PriceRequestDto> packages) {
        this.packages = packages;
    }
    
    

}

