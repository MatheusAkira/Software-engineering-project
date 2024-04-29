package br.com.lifesync.domain.tarefa;
import java.time.LocalDate;
import java.time.LocalTime;

import br.com.lifesync.domain.compromisso.Compromisso;
import br.com.lifesync.domain.usuario.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;

//Entidade que representa uma tarefa
@Entity
@Table(name = "tarefas")
public class Tarefa extends Compromisso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private LocalDate data;
    private LocalTime hora;
    private boolean ativa;
    private boolean concluida;
    @ManyToOne
    private Usuario usuario;
    
    // Construtor
    public Tarefa() {}

    public Tarefa(CadastroTarefaDTO dto) {
        this.titulo = dto.titulo();
        this.data = LocalDate.parse(dto.data());
        this.hora = LocalTime.parse(dto.hora());
        this.ativa = true;
        this.concluida = false;
    }

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

    //Métodos de ativação e desativação de tarefas
    public void ativar() {
        this.ativa = true;
    }

    public void desativar() {
        this.ativa = false;
    }

    public boolean isAtiva() {
        return ativa;
    }

    //Métodos de conclusão de tarefas
    public void concluir() {
        this.concluida = true;
    }

    public boolean isConcluida() {
        return concluida;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    //Método para editar tarefas
    public void atualizarInformacoes(@Valid EdicaoTarefaDTO dto) {
        if (dto.titulo() != null) {
            this.titulo = dto.titulo();
        }
        if (dto.data() != null) {
            this.data = LocalDate.parse(dto.data());
        }
        if (dto.hora() != null) {
            this.hora = LocalTime.parse(dto.hora());
        }
    }
}
