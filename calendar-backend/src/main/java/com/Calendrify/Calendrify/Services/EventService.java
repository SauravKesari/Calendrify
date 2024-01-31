package com.Calendrify.Calendrify.Services;

import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.Event;
import com.Calendrify.Calendrify.Repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("unchecked")
public class EventService {
    @Autowired
    EventRepo eventRepo;

    public ResponseEntity<ResponseHandler> getAllEvents(String eventID, String eventCatID, String online, String hostID) {
        try {
            List<Event> list= eventRepo.findAll();
            if (!list.isEmpty()) {
                if (eventID != null) {
                    list = list.stream()
                            .filter(item -> item.getId().equals(Integer.parseInt(eventID)))
                            .collect(Collectors.toList());
                }
                if (eventCatID != null) {
                    list = list.stream()
                            .filter(item ->
                                    item.getEventCatID().getId()
                                            .equals(Integer.parseInt(eventCatID)))
                            .collect(Collectors.toList());
                }
                if (online != null) {
                    list = list.stream()
                            .filter(item -> item.getOnline().equals(Boolean.parseBoolean(online)))
                            .collect(Collectors.toList());
                }
                if (hostID != null) {
                    list = list.stream()
                            .filter(item -> item.getHostID().getId().equals(Integer.parseInt(hostID)))
                            .collect(Collectors.toList());
                }
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, list);
            } else {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Event not exist", false, null);
            }
        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse(e.getMessage(), false, null);
        }
    }

    public ResponseEntity<ResponseHandler> addEvent(Event ev) {
        try {
            eventRepo.save(ev);
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Event Added successfully", true);
        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse(e.getMessage(), false);
        }
    }

    public ResponseEntity<ResponseHandler> updateEvent(Event ev) {
        try {
            if(eventRepo.findById(ev.getId()).isPresent()) {
                eventRepo.save(ev);
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Event update successfully", true);
            }else{
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Event not exist", false);
            }
        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse(e.getMessage(), false);
        }
    }

    public ResponseEntity<ResponseHandler> deleteEvent(int id) {
        try {
            if(eventRepo.findById(id).isPresent()) {
                eventRepo.deleteById(id);
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Event Deleted successfully", true);
            }else{
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Event not exist", false);
            }
        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse(e.getMessage(), false);
        }
    }



    public ResponseEntity<ResponseHandler> getEventByDate(String startDate, String endDate) {
        try {
            List<Event> list;
            list = eventRepo.getEventByDate(startDate, endDate);
            if (!list.isEmpty()) {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, list);
            } else {
                return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", false , null);
            }

        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse(e.getMessage(), false, null);
        }
    }


}