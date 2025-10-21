// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isProfessorRole, setIsProfessorRole] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const response = await authService.login({
                    email: formData.email,
                    senha: formData.senha,
                });
                authService.setToken(response.token);
                authService.setUser(response.user);
                onLogin();
                navigate('/dashboard');
            } else {
                await authService.register({
                    nome: formData.nome,
                    email: formData.email,
                    senha: formData.senha,
                    role: isProfessorRole ? 'PROFESSOR' : undefined,
                });
                setIsLogin(true);
                setFormData({ nome: '', email: '', senha: '' });
                setIsProfessorRole(false); // Reseta o checkbox
                alert('Cadastro realizado com sucesso! Faça login para continuar.');
            }
        } catch (err: any) {
            setError(err.response?.data?.erro || 'Erro no servidor');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsProfessorRole(e.target.checked);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">EZ Sentence Fix</h1>
                    <p className="text-gray-600 mt-2">
                        {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <> {/* Envolve nome e checkbox em um fragmento */}
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            {/* ADICIONADO: Checkbox para Professor */}
                            <div className="flex items-center">
                                <input
                                    id="role-professor"
                                    name="role-professor"
                                    type="checkbox"
                                    checked={isProfessorRole}
                                    onChange={handleRoleChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="role-professor" className="ml-2 block text-sm text-gray-900">
                                    Sou Professor
                                </label>
                            </div>
                        </>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Sua senha"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setFormData({ nome: '', email: '', senha: '' });
                            // ADICIONADO: Reseta o checkbox ao trocar de modo
                            setIsProfessorRole(false);
                        }}
                        className="text-purple-600 hover:text-purple-700 text-sm"
                    >
                        {isLogin
                            ? 'Não tem conta? Cadastre-se'
                            : 'Já tem conta? Faça login'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;