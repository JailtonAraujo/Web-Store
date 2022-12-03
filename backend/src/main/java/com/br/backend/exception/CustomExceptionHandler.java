package com.br.backend.exception;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.persistence.NoResultException;

@RestController
@ControllerAdvice
public class CustomExceptionHandler  extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handlerAllExceptions(Exception ex, WebRequest webRequest){

            ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false),500);

            return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	
	@ExceptionHandler({SQLIntegrityConstraintViolationException.class})
    public final ResponseEntity<ExceptionResponse> handlerBadRequestsExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false),400);

        return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(NoResultException.class)
    public final ResponseEntity<ExceptionResponse> handlerNotFoundExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false),404);

        return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.NOT_FOUND);
    }

}
