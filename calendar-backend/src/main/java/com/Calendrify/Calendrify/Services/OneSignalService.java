package com.Calendrify.Calendrify.Services;

import com.Calendrify.Calendrify.Healpers.Handlers.ResponseHandler;
import com.Calendrify.Calendrify.Models.BodyResponse.NotificationRequest;
import com.google.gson.Gson;
import okhttp3.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.Calendrify.Calendrify.Healpers.AppConstants.*;

@Service
@SuppressWarnings("unchecked")
public class OneSignalService {

    public ResponseEntity<ResponseHandler> SendNotificationToALl(NotificationRequest notificationRequest) {
        try {
            OkHttpClient client = new OkHttpClient();
            Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("app_id", ONE_SIGNAL_APP_ID);

            List<String> includedSegments = List.of("Subscribed Users");
            jsonMap.put("included_segments", includedSegments);

            Map<String, String> headings = new HashMap<>();
            headings.put("en", notificationRequest.getHeading());
            jsonMap.put("headings", headings);

            Map<String, String> contents = new HashMap<>();
            contents.put("en", notificationRequest.getContain());
            jsonMap.put("contents", contents);

            Gson gson = new Gson();
            String json = gson.toJson(jsonMap);

            RequestBody body = RequestBody.create(MediaType.parse("application/json"), json);
            Request request = new Request.Builder()
                    .url(ONE_SIGNAL_NOTIFICATION_URL)
                    .post(body)
                    .addHeader("accept", "application/json")
                    .addHeader("Authorization", ONE_SIGNAL_AUTHORIZATION_HEADER)
                    .addHeader("content-type", "application/json")
                    .build();

            Response response = client.newCall(request).execute();
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, response.body());
        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", false, null);
        }
    }

    public ResponseEntity<ResponseHandler> SendNotificationToGroup(NotificationRequest notificationRequest) {
        try {
            OkHttpClient client = new OkHttpClient();
            Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("app_id", ONE_SIGNAL_APP_ID);

            List<String> includePlayerIds = List.of("3dac3f6f-a548-46c6-91c6-14d8e2fce664");
            jsonMap.put("include_player_ids", includePlayerIds);

            Map<String, String> headings = new HashMap<>();
            headings.put("en", notificationRequest.getHeading());
            jsonMap.put("headings", headings);

            Map<String, String> contents = new HashMap<>();
            contents.put("en", notificationRequest.getContain());
            jsonMap.put("contents", contents);

            Gson gson = new Gson();
            String json = gson.toJson(jsonMap);
            System.out.println(json);
            RequestBody body = RequestBody.create(MediaType.parse("application/json;"), json);
            Request request = new Request.Builder()
                    .url(ONE_SIGNAL_NOTIFICATION_URL)
                    .post(body)
                    .addHeader("Authorization", ONE_SIGNAL_AUTHORIZATION_HEADER)
                    .addHeader("content-type", "application/json; charset=UTF-8")
                    .build();

            Response response = client.newCall(request).execute();
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", true, response.body());
        } catch (Exception e) {
            return (ResponseEntity<ResponseHandler>) ResponseHandler.GenerateResponse("Success", false, null);
        }
    }
}

