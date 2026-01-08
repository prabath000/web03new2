package com.example.web03.controller;

import com.example.web03.model.Quote;
import com.example.web03.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quotes")
@CrossOrigin(origins = {"*", "http://localhost:8089"})
public class QuoteController {

    @Autowired
    private QuoteRepository quoteRepository;

    @GetMapping
    public List<Quote> getAll() {
        return quoteRepository.findAll();
    }

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Quote> createFromForm(Quote quote) {
        Quote saved = quoteRepository.save(quote);
        return ResponseEntity.ok(saved);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Quote> createFromJson(@RequestBody Quote quote) {
        Quote saved = quoteRepository.save(quote);
        return ResponseEntity.ok(saved);
    }
}
