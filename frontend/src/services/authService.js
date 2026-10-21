import api from './api';

export const authService = {
  login: async (email, senha) => {
    // Modo de teste para desenvolvimento sem o back-end ativo
    if (email === 'admin@guardian.gov.br' && senha === 'admin123') {
      const mockAdmin = {
        token: 'fake-jwt-token-admin',
        id: '1',
        nome: 'Coordenador Silva',
        perfil_usuario: 'Coordenador',
      };
      sessionStorage.setItem('guardian_token', mockAdmin.token);
      sessionStorage.setItem('guardian_user', JSON.stringify({
        id: mockAdmin.id,
        nome: mockAdmin.nome,
        perfil: mockAdmin.perfil_usuario,
      }));
      return mockAdmin;
    }

    if (email === 'agente@guardian.gov.br' && senha === 'agente123') {
      const mockAgente = {
        token: 'fake-jwt-token-agente',
        id: '2',
        nome: 'Agente Sales',
        perfil_usuario: 'Agente',
      };
      sessionStorage.setItem('guardian_token', mockAgente.token);
      sessionStorage.setItem('guardian_user', JSON.stringify({
        id: mockAgente.id,
        nome: mockAgente.nome,
        perfil: mockAgente.perfil_usuario,
      }));
      return mockAgente;
    }

    // Chamada real à API quando o servidor Python estiver ligado
    const response = await api.post('/auth/login', { email, senha });
    const { token, perfil_usuario, nome, id } = response.data;

    sessionStorage.setItem('guardian_token', token);
    sessionStorage.setItem('guardian_user', JSON.stringify({ id, nome, perfil: perfil_usuario }));

    return response.data;
  },

  logout: () => {
    sessionStorage.removeItem('guardian_token');
    sessionStorage.removeItem('guardian_user');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const user = sessionStorage.getItem('guardian_user');
    return user ? JSON.parse(user) : null;
  },
};