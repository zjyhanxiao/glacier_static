package com.meixin.invest.model;

import lombok.Data;

import java.util.Date;

@Data
public class AuthUser {
	private Integer id;

    private String password;

    private Date last_login;

    private Boolean is_superuser;

    private String username;

    private String first_name;

    private String last_name;

    private String email;

    private Boolean is_staff;

    private Boolean is_active;

    private Date date_joined;

    private String source;

    private String phone;
}
