package br.com.cursoudemy.productapi.config;

import br.com.cursoudemy.productapi.exceptions.ExceptionDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class ExceptionControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> onMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        var errors = e.getAllErrors().stream().map(error -> {
            var details = new ExceptionDetails();
            details.setStatus(HttpStatus.BAD_REQUEST.value());
            details.setMessage(error.getDefaultMessage());
            return details;
        }).collect(Collectors.toList());
        var details = new ExceptionDetails();
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
