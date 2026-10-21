import api from './api';

export const occurrencesService = {
  // POST /api/v1/ocorrencias
  create: async ({ operacao_id, segredo_agente, dados_sensiveis }) => {
    const response = await api.post('/ocorrencias', {
      operacao_id,
      segredo_agente,
      dados_sensiveis,
    });
    return response.data;
  },

  // GET /api/v1/ocorrencias/{id}
  getById: async (id) => {
    const response = await api.get(`/ocorrencias/${id}`);
    return response.data;
  },

  // POST /api/v1/ocorrencias/{id}/decifrar
  decrypt: async (id, segredo_operacao) => {
    const response = await api.post(`/ocorrencias/${id}/decifrar`, {
      segredo_operacao,
    });
    // Retorna os dados descompactados/decifrados para manter só no state React
    return response.data;
  },
};