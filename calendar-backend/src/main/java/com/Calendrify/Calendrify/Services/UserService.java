package com.Calendrify.Calendrify.Services;

import com.Calendrify.Calendrify.Healpers.Exceptions.ResourceNotFoundException;
import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.Event;
import com.Calendrify.Calendrify.Models.User;
import com.Calendrify.Calendrify.Repository.EventRepo;
import com.Calendrify.Calendrify.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("unchecked")
public class UserService {
    @Autowired
    UserRepo userRepo;
    EventService eventService;
    @Autowired
    private EventRepo eventRepo;


    public ResponseEntity<ResponseHandler> getAllUsers(String userID, String email) {
        try {
            List<User> list = userRepo.findAll();
            if (userID != null) {
                list = list.stream()
                        .filter(item -> item.getId().equals(Integer.parseInt(userID)))
                        .collect(Collectors.toList());
            }

            if (email != null) {
                list = list.stream()
                        .filter(item -> item.getEmail().equals(email))
                        .collect(Collectors.toList());
            }
            if (!list.isEmpty()) {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, list);
            }else{
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("User not found", false, list);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went wrong!", false, null);
    }

    public ResponseEntity<ResponseHandler> getUserById(int id) {
        try {
            User user = userRepo.findById(id).get();
            if (user != null) {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success!", true,
                        user);

            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went wrong!", false, null);

    }

    public ResponseEntity<ResponseHandler> deleteUserById(int id) {
        try {
            User isExistingUser = userRepo.findById(id).get();
            if (isExistingUser != null) {
                List<Event> eventsHostedByUserId = eventRepo.getEventByUserId(id);
                if (eventsHostedByUserId != null) {
                    for (Event e : eventsHostedByUserId) {
                        eventRepo.deleteById(e.getId());
                    }
                    userRepo.deleteById(id);
                }
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("User Deleted!", true);
            } else {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Use Not Found with " + id, false);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went wrong!", false, null);
    }

    public ResponseEntity<ResponseHandler> addUser(User user) {
        try {
            userRepo.save(user);
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("User Added!", true);
        } catch (Exception e) {
            System.out.println("Save User Error:" + e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went wrong!", false);
    }


    public ResponseEntity<ResponseHandler> updateUserById(int id, User user) {
        User updateUser = null;
        try {
            updateUser = userRepo.findById(id).
                    orElseThrow(() -> new ResourceNotFoundException("User not Found"));

            updateUser.setEmail(user.getEmail()==null?updateUser.getEmail(): user.getEmail());
            updateUser.setPassword(user.getPassword()==null?updateUser.getPassword(): user.getPassword());
            updateUser.setCreatedAt(user.getEmail()==null?updateUser.getCreatedAt(): user.getCreatedAt());
            updateUser.setIsDeleted(user.getIsDeleted()==null?updateUser.getIsDeleted(): user.getIsDeleted());
            updateUser.setFirstName(user.getFirstName()==null?updateUser.getFirstName(): user.getFirstName());
            updateUser.setLastName(user.getLastName()==null?updateUser.getLastName(): user.getLastName());
            updateUser.setMobile(user.getMobile()==null?updateUser.getMobile(): user.getMobile());
            userRepo.save(updateUser);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("User Updated!!", true, updateUser);


    }
}
