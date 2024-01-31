package com.Calendrify.Calendrify.Controllers;

import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.User;
import com.Calendrify.Calendrify.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;
    @GetMapping("/getAllUsers")
    public ResponseEntity<ResponseHandler> getAllUsers(@RequestParam(required = false) String userID,
                                                       @RequestParam(required = false) String email){
        return userService.getAllUsers(userID,email);
    }

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<ResponseHandler> getUserById(@PathVariable String userId){
        return userService.getUserById(Integer.parseInt(userId));
    }

    @DeleteMapping("/deleteUserById/{userId}")
    public ResponseEntity<ResponseHandler> deleteUserById(@PathVariable String userId){
        return userService.deleteUserById(Integer.parseInt(userId));
    }

    @PostMapping("/addUser")
    public ResponseEntity<ResponseHandler> addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @RequestMapping(value = "/updateUserById/{userId}",method = RequestMethod.PUT)
    public ResponseEntity<ResponseHandler> updateUserById(@PathVariable String userId, @RequestBody User user){
        return userService.updateUserById(Integer.parseInt(userId),user);
    }
}
