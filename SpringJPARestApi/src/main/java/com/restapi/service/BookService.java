package com.restapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.restapi.entity.Book;
import com.restapi.repository.BookRepository;
import com.restapi.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class BookService {

	@Autowired
    private  BookRepository repo;
    
    private static final Logger log = LoggerFactory.getLogger(BookService.class);
    		
  
    public List<Book> getAll() {
        log.info("Fetching all books");
        return repo.findAll();
    }

    public Book getById(int id) {
        log.info("Fetching book with id {}", id);

        return repo.findById(id)
                .orElseThrow(() -> {
                    log.error("Book not found with id {}", id);
                    return new ResourceNotFoundException("Book not found with id " + id);
                });
    }

    public Book create(Book book) {
        log.info("Creating book {}", book.getTitle());
        return repo.save(book);
    }

    public Book update(int id, Book book) {
        log.info("Updating book with id {}", id);

        Book existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + id));

        existing.setTitle(book.getTitle());
        existing.setDescription(book.getDescription());

        return repo.save(existing);
    }

    public void delete(int id) {
        log.info("Deleting book with id {}", id);

        Book book = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + id));

        repo.delete(book);
    }
}