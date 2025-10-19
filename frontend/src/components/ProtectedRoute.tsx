import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/api';
import { UserRole } from '../types';

interface ProtectedRouteProps {
    requiredRole: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getUser();

    if (!isAuthenticated) {
        // Se n�o estiver logado, redireciona para a p�gina de login
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== requiredRole) {
        // Se estiver logado, mas n�o tiver o papel correto, redireciona para o dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // Se estiver logado e tiver o papel correto, renderiza o conte�do da rota
    return <Outlet />;
};

export default ProtectedRoute;