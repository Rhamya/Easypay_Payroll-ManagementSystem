package com.hexaware.easypay.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexaware.easypay.entity.User;
import com.hexaware.easypay.repository.UserRepository;

@Service
public class UserInfoUserDetailsService implements UserDetailsService { // UserDetailsServiceImp class

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userInfo = repository.findByUsername(username);

		return userInfo.map(UserInfoDetails::new)
				.orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

	}
}
