package com.Calendrify.Calendrify.Services;

import com.Calendrify.Calendrify.Models.Comment;
import com.Calendrify.Calendrify.Repository.CommentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventCommentService {

    @Autowired
    CommentsRepo commentsRepo;

    public ResponseEntity<?> getAllEventComments(){
        List<Comment> list;
        list=commentsRepo.findAll();
        if(!list.isEmpty()){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        return  new ResponseEntity<>("No Event Added", HttpStatus.OK);
    }

    public ResponseEntity<?> addComment(Comment cm){
        try {
            commentsRepo.save(cm);
            return  new ResponseEntity<>("Comment Added on event", HttpStatus.OK);
        } catch (Exception e) {
            return  new ResponseEntity<>("Some thing went wrong\n"+e.getMessage(), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getAllEventCommentByResponse(String response){
        List<Comment> list;
        list=commentsRepo.getAllEventCommentByResponse(response.toLowerCase());
        if(!list.isEmpty()){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        return  new ResponseEntity<>("No Events found", HttpStatus.OK);
    }
}


//    public String getAllEventComments(){
//        List<Comment> comments=new ArrayList<>();
//        comments=commentsRepo.findAll();
//        System.out.println(comments.get(0).getInviteID());
//        return comments.get(1).getInviteID()+""+comments.get(1).getComments()+""+comments.get(1).getResponse();
//    }

