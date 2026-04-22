package com.restapi.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.util.Date;
import javax.crypto.SecretKey;
@Component
public class JwtUtil {
    private final SecretKey key = Keys.hmacShaKeyFor("mysecretkeymysecretkey12345678901".getBytes());
    
    
    
    public JwtUtil() {
        super();
        // TODO Auto-generated constructor stub
    }
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}