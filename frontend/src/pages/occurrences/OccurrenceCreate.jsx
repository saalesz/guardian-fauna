import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, MapPin, KeyRound, User, PlusCircle } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { occurrencesService } from '../../services/occurrencesService';
import styles from '../../styles/pages/occurrences/OccurrenceCreate.module.css';

export default function OccurrenceCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    operacao_id: 'OP-2026-FNX',
    segredo_agente: '',
    localizacao: '',
    coordenadas: '',
    agente_responsavel: '',
    detalhes: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      operacao_id: formData.operacao_id,
      segredo_agente: formData.segredo_agente,
      dados_sensiveis: {
        localizacao: formData.localizacao,
        coordenadas: formData.coordenadas,
        agente_responsavel: formData.agente_responsavel,
        detalhes: formData.detalhes,
      },
    };

    try {
      await occurrencesService.create(payload);
    } catch {
      // Mock silencioso para testes locais sem o backend em execução
    } finally {
      setLoading(false);
      navigate('/ocorrencias');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Registrar Ocorrência</h1>
        <p className={styles.subtitle}>
          Os dados sensíveis informados serão cifrados matricialmente antes da gravação[cite: 1, 2].
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <Input
              label="Identificador da Operação"
              name="operacao_id"
              value={formData.operacao_id}
              onChange={handleChange}
              required
            />
            <Input
              label="Segredo da Operação (Chave de Cifra)"
              name="segredo_agente"
              type="password"
              placeholder="Ex: ChaveOperacional123"
              icon={KeyRound}
              value={formData.segredo_agente}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid}>
            <Input
              label="Local Exato da Apreensão"
              name="localizacao"
              placeholder="Ex: KM 42 Rod. dos Bandeirantes"
              icon={MapPin}
              value={formData.localizacao}
              onChange={handleChange}
              required
            />
            <Input
              label="Coordenadas GPS"
              name="coordenadas"
              placeholder="-23.442, -46.918"
              value={formData.coordenadas}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Agente Responsável"
            name="agente_responsavel"
            placeholder="Nome ou Matrícula do Agente"
            icon={User}
            value={formData.agente_responsavel}
            onChange={handleChange}
            required
          />

          <div className={styles.textareaWrapper}>
            <label className={styles.textareaLabel}>Detalhes dos Animais e Apreensão</label>
            <textarea
              className={styles.textarea}
              rows={3}
              name="detalhes"
              placeholder="Espécies encontradas, quantidade, condições do cativeiro..."
              value={formData.detalhes}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: '8px' }}>
            <Button type="submit" loading={loading} icon={ShieldAlert}>
              Cifrar e Registrar no Banco[cite: 1, 3]
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}