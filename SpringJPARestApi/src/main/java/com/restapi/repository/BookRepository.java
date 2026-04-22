package com.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

import com.restapi.entity.Book;

public interface BookRepository extends JpaRepository<Book, Integer>
{

}