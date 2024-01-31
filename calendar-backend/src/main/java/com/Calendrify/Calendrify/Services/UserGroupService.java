package com.Calendrify.Calendrify.Services;

import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.User;
import com.Calendrify.Calendrify.Models.Usergroup;
import com.Calendrify.Calendrify.Repository.UserGroupRepo;
import com.Calendrify.Calendrify.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserGroupService {

    @Autowired
     UserGroupRepo userGroupRepo;

    @Autowired
    UserRepo userRepo;

    public ResponseEntity<ResponseHandler> getAllGroup(){
        List<Usergroup> usergroupList;
        try{
            usergroupList=userGroupRepo.findAll();
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, usergroupList);
        }catch (Exception e){
            System.out.println("Group Error "+e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went wrong!",false,null);

    }

    public ResponseEntity<ResponseHandler> getGroupById(int groupId) {
        try {
            if (userGroupRepo.findById(groupId).isPresent()) {
            Usergroup usergroup = userGroupRepo.findById(groupId).get();
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, usergroup);
            }
        }catch (Exception e){
            System.out.println("UserGroup By Id:"+e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went wrong!",false,null);
    }


    public ResponseEntity<ResponseHandler> createGroup(int userId, Usergroup usergroup) {

        try {
            if (userRepo.findById(userId).isPresent()) {
                User isExistingUser=userRepo.findById(userId).get();
                usergroup.setCreateBy(isExistingUser);
                userGroupRepo.save(usergroup);
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Group Created!", true, usergroup);
            } else {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("User not exist with " + userId, false);
            }
        }catch (Exception e){
            System.out.println("Save Group "+e.getMessage());
        }
        return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Something went Wrong! ", false);

    }
}
