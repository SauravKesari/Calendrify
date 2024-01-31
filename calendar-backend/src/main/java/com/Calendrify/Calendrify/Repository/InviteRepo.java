package com.Calendrify.Calendrify.Repository;

import com.Calendrify.Calendrify.Models.Eventinvite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InviteRepo extends JpaRepository<Eventinvite, Integer> {

    @Query(value = "SELECT * FROM `eventinvite`",nativeQuery = true)
    List<Eventinvite> getalleventinvite();
}
