package com.Calendrify.Calendrify.Controllers;

import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.Usergroup;
import com.Calendrify.Calendrify.Services.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserGroupController {

    @Autowired
    UserGroupService userGroupService;
    @GetMapping("/group")
    public ResponseEntity<ResponseHandler> getAllGroup(){
        return userGroupService.getAllGroup();
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<ResponseHandler> getGroupById(@PathVariable String groupId){
        return userGroupService.getGroupById(Integer.parseInt(groupId));
    }

    @PostMapping("/group/{userId}")
    public ResponseEntity<ResponseHandler> createGroup(@PathVariable String userId, @RequestBody Usergroup usergroup){
        return userGroupService.createGroup(Integer.parseInt(userId),usergroup);
    }
}
