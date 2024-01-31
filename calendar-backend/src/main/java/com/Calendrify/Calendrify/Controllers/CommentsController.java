package com.Calendrify.Calendrify.Controllers;


import com.Calendrify.Calendrify.Models.Comment;
import com.Calendrify.Calendrify.Services.EventCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class CommentsController {

    @Autowired
    EventCommentService eventCommentService;

    @GetMapping("/getAllEventComments")
    public ResponseEntity<?> getAllEventComment(){
        return eventCommentService.getAllEventComments();
    }

    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(@RequestBody Comment comment){
        return eventCommentService.addComment(comment);
    }

    @GetMapping("/getAllEventByResponse/{response}")
    public ResponseEntity<?> getAllEventCommentByResponse(@PathVariable String response){
        return eventCommentService.getAllEventCommentByResponse(response);
    }
}
