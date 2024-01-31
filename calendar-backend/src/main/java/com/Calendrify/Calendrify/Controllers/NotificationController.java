package com.Calendrify.Calendrify.Controllers;

import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.BodyResponse.NotificationRequest;
import com.Calendrify.Calendrify.Services.OneSignalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class NotificationController {
    private final OneSignalService oneSignalService;

    public NotificationController(OneSignalService oneSignalService) {
        this.oneSignalService = oneSignalService;
    }

    @PostMapping("/toAllUser")
    public ResponseEntity<ResponseHandler> toAllUser(@RequestBody NotificationRequest request) {
        return oneSignalService.SendNotificationToALl(request);
    }

    @PostMapping("/toGroup")
    public ResponseEntity<ResponseHandler> toGroup(@RequestBody NotificationRequest request) {
        return oneSignalService.SendNotificationToGroup(request);
    }
}
