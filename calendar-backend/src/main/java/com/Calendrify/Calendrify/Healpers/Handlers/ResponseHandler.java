package com.Calendrify.Calendrify.Healpers.Handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class ResponseHandler {
    public static ResponseEntity<?> GenerateResponse(String message, boolean status, Object responseObj) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        map.put("data",responseObj);
        return new ResponseEntity<Object>(map,HttpStatus.OK);
    }

    public static ResponseEntity<?> GenerateResponse(String message, boolean status) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status);
        return new ResponseEntity<Object>(map,HttpStatus.OK);
    }
}
