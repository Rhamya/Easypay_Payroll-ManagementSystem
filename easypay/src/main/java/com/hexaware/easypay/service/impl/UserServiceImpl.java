//package com.hexaware.easypay.service.impl;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//import com.hexaware.easypay.dto.UserDTO;
//import com.hexaware.easypay.entity.User;
//import com.hexaware.easypay.repository.UserRepository;
//import com.hexaware.easypay.service.UserService;
//
//import jakarta.transaction.Transactional;
//
//@Service
//@Transactional
//public class UserServiceImpl implements UserService {
//
//	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
//
//	private final UserRepository userRepository;
//
//	public UserServiceImpl(UserRepository userRepository) {
//		this.userRepository = userRepository;
//	}
//
//	private UserDTO toDTO(User user) {
//		if (user == null)
//			return null;
//
//		UserDTO dto = new UserDTO();
//		dto.setId(user.getUserId());
//		dto.setUsername(user.getUsername());
//		dto.setEmail(user.getEmail());
//		dto.setRole(user.getRole());
//		// Do NOT include password in response
//		return dto;
//	}
//
//	private User toEntity(UserDTO dto) {
//		if (dto == null)
//			return null;
//
//		User user = new User();
//		user.setUsername(dto.getUsername());
//		user.setEmail(dto.getEmail());
//		user.setRole(dto.getRole());
//		user.setActiveStatus(true);
//
//		// Only set password if provided
//		if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
//			user.setPassword(dto.getPassword());
//		}
//
//		return user;
//	}
//
//	@Override
//	public UserDTO createUser(UserDTO userDTO) {
//		if (userRepository.existsByUsername(userDTO.getUsername())) {
//			logger.error("Username {} already exists", userDTO.getUsername());
//			throw new RuntimeException("Username already exists: " + userDTO.getUsername());
//		}
//		User user = toEntity(userDTO);
//		User saved = userRepository.save(user);
//		logger.info("Created new user with ID {}", saved.getUserId());
//		return toDTO(saved);
//	}
//
//	@Override
//	public UserDTO updateUser(Long id, UserDTO userDTO) {
//		User existing = userRepository.findById(id)
//				.orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
//
//		existing.setUsername(userDTO.getUsername());
//		existing.setEmail(userDTO.getEmail());
//		existing.setRole(userDTO.getRole());
//		existing.setPassword(userDTO.getPassword());
//
//		User updated = userRepository.save(existing);
//		logger.info("Updated user with ID {}", id);
//		return toDTO(updated);
//	}
//
//	@Override
//	public void deleteUser(Long id) {
//		User existing = userRepository.findById(id)
//				.orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
//		userRepository.delete(existing);
//		logger.info("Deleted user with ID {}", id);
//	}
//
//	@Override
//	public UserDTO getUserById(Long id) {
//		User user = userRepository.findById(id)
//				.orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
//		return toDTO(user);
//	}
//
//	@Override
//	public List<UserDTO> getAllUsers() {
//		return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
//	}
//}
