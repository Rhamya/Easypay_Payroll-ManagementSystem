package com.hexaware.easypay.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hexaware.easypay.security.JwtAuthFilter;
import com.hexaware.easypay.security.UserInfoUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	JwtAuthFilter authFilter;

	@Bean
	// authentication
	public UserDetailsService userDetailsService() {
		
		return new UserInfoUserDetailsService();
	}

	@Bean
	public SecurityFilterChain getSecurityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf().disable().authorizeHttpRequests()

				// Public endpoints (auth)
				.requestMatchers("/api/users/login", "/api/users/register").permitAll()


				// --- ADMIN: full CRUD ---
				.requestMatchers("/employees/**").hasRole("ADMIN").requestMatchers("/payroll/**").hasRole("ADMIN")
				.requestMatchers("/salary/**").hasRole("ADMIN").requestMatchers("/attendance/**").hasRole("ADMIN")
				.requestMatchers("/leaverequest/**").hasRole("ADMIN").requestMatchers("/dept/**").hasRole("ADMIN")
				.requestMatchers("/desig/**").hasRole("ADMIN")

				// --- EMPLOYEE: update own details, view own salary ---
				.requestMatchers(HttpMethod.PUT, "/employees/*").hasRole("EMPLOYEE")
				.requestMatchers(HttpMethod.GET, "/salaries/*").hasRole("EMPLOYEE")

				// --- PAYROLL PROCESSOR: edit/view salary + payroll ---
				.requestMatchers("/salaries/**").hasRole("PAYROLL").requestMatchers("/payrolls/**").hasRole("PAYROLL_PROCESSOR")

				// --- MANAGER / SUPERVISOR ---
				.requestMatchers(HttpMethod.GET, "/salaries/**").hasAnyRole("MANAGER", "SUPERVISOR")
				.requestMatchers(HttpMethod.GET, "/payrolls/**").hasAnyRole("MANAGER", "SUPERVISOR")
				.requestMatchers(HttpMethod.PUT, "/leaverequest/**").hasAnyRole("MANAGER", "SUPERVISOR")

				// Fallback
				.anyRequest().authenticated()

				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class).build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();

	}

}