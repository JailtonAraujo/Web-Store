package com.br.backend.exception;

public class WrongPasswordException extends Exception{

    private static final long serialVersionUID = 2646352348288448111L;

    public WrongPasswordException(String exception){
        super(exception);
    }
}
