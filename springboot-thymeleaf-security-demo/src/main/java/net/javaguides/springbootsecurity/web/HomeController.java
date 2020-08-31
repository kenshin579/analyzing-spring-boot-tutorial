package net.javaguides.springbootsecurity.web;

import lombok.extern.slf4j.Slf4j;
import net.javaguides.springbootsecurity.entities.Message;
import net.javaguides.springbootsecurity.repositories.MessageRepository;
import net.javaguides.springbootsecurity.web.dto.TestRequestDto;
import net.javaguides.springbootsecurity.web.dto.TestResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author Ramesh Fadatare
 */
@Slf4j
@Controller
public class HomeController {
	@Autowired
	private MessageRepository messageRepository;

	@GetMapping("/home")
	public String home(Model model) {
		model.addAttribute("msgs", messageRepository.findAll());
		return "userhome";
	}

	@PostMapping("/messages")
	public String saveMessage(Message message) {
		messageRepository.save(message);
		return "redirect:/home";
	}

	@GetMapping("/test")
	public ResponseEntity<?> test(@RequestParam(value = "name") String name) {
		log.info("name : {}", name);

		return new ResponseEntity<>(new TestResponseDto(name), HttpStatus.OK);
	}

	@PostMapping("/admin/new")
	public ResponseEntity<?> adminNew(@ModelAttribute TestRequestDto requestDto) {
		log.info("requestDto : {}", requestDto);

		return new ResponseEntity<>(new TestResponseDto(requestDto.getName()), HttpStatus.OK);
	}

	@GetMapping("/admin/all")
	public ResponseEntity<?> adminAll() {
		log.info("admin all");
		return new ResponseEntity<>(new TestResponseDto("all"), HttpStatus.OK);
	}
}
