package com.Calendrify.Calendrify.Repository;

import com.Calendrify.Calendrify.Models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepo extends JpaRepository<Event, Integer> {
    @Query(value = "SELECT * FROM `events`",nativeQuery = true)
    List<Event> getAllEvents();

    @Query(value = "SELECT * FROM `events` where online =?1",nativeQuery = true)
    List<Event> getEventByMode(boolean online);
    @Query(value = "SELECT * FROM `events` WHERE DATE(`startDateTime`) BETWEEN ?1 AND ?2",nativeQuery = true)
    List<Event> getEventByDate(String startDate,String endDate);

    @Query(value = "SELECT * FROM `events` where eventCatID =?1",nativeQuery = true)
    List<Event> getEventByCategory(int eventCatID);

    @Query(value = "SELECT * FROM `events` where hostID =?1",nativeQuery = true)
    List<Event> getEventByUserId(int eventCatID);


}
