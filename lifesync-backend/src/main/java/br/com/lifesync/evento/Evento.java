package br.com.lifesync.evento;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "eventos")
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private LocalDate data;
    private LocalTime hora;
    private String local;
    
    // Construtor
    //public Evento(String titulo, Date data, String hora, String local) {
    //    this.titulo = titulo;
    //    this.data = data;
     //   this.hora = hora;
    //    this.local = local;
    //}
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public LocalDate getData() {
        return data;
    }
    
    public void setData(LocalDate data) {
        this.data = data;
    }
    
    public LocalTime getHora() {
        return hora;
    }
    
    public void setHora(LocalTime hora) {
        this.hora = hora;
    }
    
    public String getLocal() {
        return local;
    }
    
    public void setLocal(String local) {
        this.local = local;
    }
}



//public class Main {
   // public static void main(String[] args) {
        // Exemplo de uso da classe EventoService para adicionar um evento
        //EventoService eventoService = new EventoService();
        
        // Dados do evento
        //String titulo = "Reunião de Projeto";
        //Date data = new Date(); // Aqui você precisa definir a data do evento
        //String hora = "10:00"; // Aqui você precisa definir a hora do evento
        //String local = "Sala de Reuniões";
        
        // Adicionando o evento
        //eventoService.adicionarEvento(titulo, data, hora, local);
    //}
//}
