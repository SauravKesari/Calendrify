package com.Calendrify.Calendrify.Controllers;

import com.Calendrify.Calendrify.Models.Eventinvite;
import com.Calendrify.Calendrify.Services.EventInviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@RequestMapping("/api")
public class EventInviteController {

    @Autowired
    EventInviteService eventInviteService;

    @GetMapping("/getalleventinvite")

    public List<Eventinvite> getalleventinvite(){

        return eventInviteService.getalleventinvite();
    }

    @GetMapping("/getEventInviteById/{inviteID}")
    public ResponseEntity<?> getEventInviteById(@PathVariable String inviteID){
        return eventInviteService.geteventinviteById(Integer.parseInt(inviteID));
    }

    @PostMapping("/addeventinvite")
    public ResponseEntity<?> addEventInvite(@RequestBody Eventinvite eventinvite){
        return eventInviteService.addEventInvite(eventinvite);
    }

}
