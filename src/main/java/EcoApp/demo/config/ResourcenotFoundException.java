package EcoApp.demo.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourcenotFoundException extends RuntimeException {
    public ResourcenotFoundException(String message) {
        super(message);
    }
}