package br.com.lifesync.compromisso;

import java.time.LocalDate;
import java.time.LocalTime;

public class Compromisso {

    private Long id;
    private String titulo;

    public String getTitulo() {
        return titulo;
    }

    public LocalDate getData() {
        return data;
    }

    public LocalTime getHora() {
        return hora;
    }

    private LocalDate data;
    private LocalTime hora;

    public Long getId() {
        return id;
    }
}
