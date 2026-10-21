import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, KeyRound, Calendar } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from '../../styles/pages/operations/Operations.module.css';

export default function OperationCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    dataInicio: '',
    segredoBase: '',
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/operacoes');
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ maxWidth: '600px' }}>
        <h1 className={styles.title}>Criar Nova Operação</h1>
        <p className={styles.subtitle}>
          Defina o identificador e a chave/segredo que gerará o motor matricial da Cifra[cite: 1, 2].
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Nome da Operação"
            name="nome"
            placeholder="Ex: Operação Asas Abertas"
            icon={Briefcase}
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Input
            label="Código Operacional"
            name="codigo"
            placeholder="OP-2026-ASA"
            value={form.codigo}
            onChange={handleChange}
            required
          />
          <Input
            label="Data de Início"
            name="dataInicio"
            type="date"
            icon={Calendar}
            value={form.dataInicio}
            onChange={handleChange}
            required
          />
          <Input
            label="Segredo Base da Operação"
            name="segredoBase"
            type="password"
            placeholder="Segredo compartilhado com os agentes da operação[cite: 1]"
            icon={KeyRound}
            value={form.segredoBase}
            onChange={handleChange}
            required
          />
          <div style={{ marginTop: '10px' }}>
            <Button type="submit" loading={loading}>
              Criar Operação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}