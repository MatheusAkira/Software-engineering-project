package br.com.lifesync.usuario;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

//Representa um objeto de transferência de dados para o cadastro de um usuário
public record CadastroUsuarioDTO(
    @NotBlank(message = "O nome é obrigatório")
    String nome,
    @Email(message = "E-mail inválido")
    @NotBlank(message = "O e-mail é obrigatório")
    String email,
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    String senha) {
}
