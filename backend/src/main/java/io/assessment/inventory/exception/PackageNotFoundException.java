package io.assessment.inventory.exception;

public class PackageNotFoundException extends RuntimeException{
    public PackageNotFoundException(String message) {
        super(message);
    }
}
