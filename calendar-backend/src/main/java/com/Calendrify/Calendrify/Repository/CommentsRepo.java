package com.Calendrify.Calendrify.Repository;

import com.Calendrify.Calendrify.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentsRepo extends JpaRepository<Comment,Integer> {

    @Query(value = "SELECT * FROM `comments`",nativeQuery = true)
    List<Comment> getAllEventComment();

    @Query(value = "SELECT * FROM comments WHERE RESPONSE=?1",nativeQuery = true)
    List<Comment> getAllEventCommentByResponse(String response);
}
