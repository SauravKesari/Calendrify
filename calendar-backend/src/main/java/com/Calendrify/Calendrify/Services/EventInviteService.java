package com.Calendrify.Calendrify.Services;

import com.Calendrify.Calendrify.Models.Eventinvite;
import com.Calendrify.Calendrify.Repository.InviteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventInviteService {

    @Autowired
    InviteRepo inviteRepo;

    public List<Eventinvite> getalleventinvite()
    {
        List<Eventinvite> list = new ArrayList<>();
        list = inviteRepo.findAll();
        if(!list.isEmpty()){
            return list;
        }
        return  null;
    }

    public ResponseEntity<?> geteventinviteById(int id)
    {
        try {
            Eventinvite list ;
            list = inviteRepo.findById(id).get();
            return new ResponseEntity<>(list, HttpStatus.OK);

        } catch (Exception e) {

            return  new ResponseEntity<>("Invite not exist", HttpStatus.OK);

        }
    }

    public ResponseEntity<?> addEventInvite(Eventinvite einvite){
        try {
            inviteRepo.save(einvite);

            return  new ResponseEntity<>("Invite Added", HttpStatus.OK);
        } catch (Exception e) {
            return  new ResponseEntity<>("Some thing went wrong\n"+e.getMessage(), HttpStatus.OK);
        }
    }
}
