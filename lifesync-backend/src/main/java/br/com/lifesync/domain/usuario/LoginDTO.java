package br.com.lifesync.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

//Representa um objeto de transferência de dados para o login de um usuário
public record LoginDTO(
        @Email(message = "E-mail inválido")
        @NotBlank(message = "O e-mail é obrigatório")
        String email,
        @NotBlank(message = "A senha é obrigatória")
        String senha
) {}
