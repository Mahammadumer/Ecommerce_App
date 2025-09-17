package EcoApp.demo.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionhandler {
	@ExceptionHandler(ResourcenotFoundException.class)
	public ResponseEntity<String> handleNotFound(ResourcenotFoundException ex){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		
	}
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<String> handleNotFound(BusinessException ex){
		return ResponseEntity.badRequest().body(ex.getMessage());
	}
	
}
