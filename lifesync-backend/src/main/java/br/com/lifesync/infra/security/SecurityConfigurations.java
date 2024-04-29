package br.com.lifesync.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> {
                    req.requestMatchers(HttpMethod.POST, "/tarefas").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.GET, "/tarefas").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.PUT, "/tarefas/{id}").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.PATCH, "/tarefas/{id}").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.DELETE, "/tarefas/{id}").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.PATCH, "/tarefas/{id}/concluir").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.POST, "/eventos").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.GET, "/eventos").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.PUT, "/eventos/{id}").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.PATCH, "/eventos/{id}").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.DELETE, "/eventos/{id}").hasRole("USUARIO");
                    req.requestMatchers(HttpMethod.GET, "/compromissos").hasRole("USUARIO");
                    req.requestMatchers("/login", "/login/**").permitAll();
                    req.requestMatchers("/signin", "/signin/**").permitAll();
                    req.anyRequest().authenticated();
                })
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

}