package com.Calendrify.Calendrify.Repository;

import com.Calendrify.Calendrify.Models.Event;
import com.Calendrify.Calendrify.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserRepo extends JpaRepository<User,Integer> {


    @Query(value = "Delete FROM `users` WHERE userID=?1",nativeQuery = true)
    void deleteUserById(int userId);

}
