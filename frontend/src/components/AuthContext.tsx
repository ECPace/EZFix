import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { authService } from '../services/api';
import { User } from '../types'; // Importa seu tipo User

interface AuthContextType {
    usuarioAtual: User | null;
    autenticado: boolean;
    carregando: boolean;
    login: (usuario: User) => void; // Fun��o para atualizar usu�rio ap�s login
    logout: () => void;
}

// Cria o contexto com valores padr�o
const AuthContext = createContext<AuthContextType>({
    usuarioAtual: null,
    autenticado: false,
    carregando: true,
    login: () => { },
    logout: () => { },
});

// Cria o componente provedor
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [usuarioAtual, setUsuarioAtual] = useState<User | null>(null);
    const [carregando, setCarregando] = useState<boolean>(true);

    // Verifica o status de autentica��o na carga inicial
    useEffect(() => {
        const verificarAuth = () => {
            const usuario = authService.getUser(); // Obt�m usu�rio com role do localStorage
            const token = authService.getToken();

            if (usuario && token) {
                setUsuarioAtual(usuario);
            } else {
                authService.logout(); // Garante estado limpo se algo estiver faltando
                setUsuarioAtual(null);
            }
            setCarregando(false);
        };
        verificarAuth();
    }, []);

    const login = useCallback((usuario: User) => {
        setUsuarioAtual(usuario); // Atualiza o estado quando o login ocorre
        // Nota: Token e Usu�rio j� devem estar definidos no localStorage pela LoginPage
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUsuarioAtual(null);
    }, []);

    const autenticado = !!usuarioAtual; // Determina status de autentica��o baseado no usuarioAtual

    return (
        <AuthContext.Provider value={{ usuarioAtual, autenticado, carregando, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para usar o contexto de autentica��o facilmente
export const useAuth = () => useContext(AuthContext); // Mantive 'useAuth' por conven��o comum