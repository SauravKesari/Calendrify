package com.Calendrify.Calendrify.Repository;

import com.Calendrify.Calendrify.Models.User;
import com.Calendrify.Calendrify.Models.Usergroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupRepo extends JpaRepository<Usergroup,Integer> {
}
