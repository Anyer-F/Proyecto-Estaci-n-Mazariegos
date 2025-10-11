package com.umg.gastation.service;

import com.umg.gastation.entity.Usuario;
import com.umg.gastation.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario iniciarSesion(String correo, String password) {
        return usuarioRepository.findByCorreo(correo)
                .filter(u -> u.getPassword().equals(password) && u.isActivo())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas o usuario inactivo"));
    }

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    @Transactional
    public Usuario crear(Usuario usuario) {
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado");
        }
        // Aquí se debería codificar la contraseña antes de guardarla
        // Por ahora, se guarda como texto plano
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario actualizar(Long id, Usuario actualizado) {
        Usuario existente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        existente.setNombre(actualizado.getNombre());
        existente.setRol(actualizado.getRol());
        existente.setActivo(actualizado.isActivo());
        // No se debería poder cambiar el correo ni la contraseña directamente aquí
        return usuarioRepository.save(existente);
    }

    @Transactional
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }
}
