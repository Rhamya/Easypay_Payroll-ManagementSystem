package com.hexaware.easypay.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hexaware.easypay.entity.User;

public class UserInfoDetails implements UserDetails { // UserDetailsImp class

	private String name;
	private String password;
	private List<GrantedAuthority> authorities;

	public UserInfoDetails(User userInfo) {
	    name = userInfo.getUsername(); // matches your DB column
	    password = userInfo.getPassword();
	    authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_" + userInfo.getRole()));
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return name;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}