import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, User, KeyRound } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from '../../styles/pages/shelters/Shelters.module.css';

export default function ShelterCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nomePublico: '',
    especies: '',
    enderecoSigiloso: '',
    responsavelTecnico: '',
    segredoOperacional: '',
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/abrigos');
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ maxWidth: '640px' }}>
        <h1 className={styles.title}>Cadastrar Abrigo / CETAS</h1>
        <p className={styles.subtitle}>
          Os dados de localização física e nomes de contato serão protegidos[cite: 1].
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Nome Público do Ponto"
            name="nomePublico"
            placeholder="Ex: CETAS Regional Serrana"
            icon={Home}
            value={form.nomePublico}
            onChange={handleChange}
            required
          />
          <Input
            label="Espécies Habilitadas"
            name="especies"
            placeholder="Ex: Passeriformes, Répteis, Felinos"
            value={form.especies}
            onChange={handleChange}
            required
          />
          <Input
            label="Endereço Exato (Sigiloso)"
            name="enderecoSigiloso"
            placeholder="Endereço completo da unidade[cite: 1]"
            icon={MapPin}
            value={form.enderecoSigiloso}
            onChange={handleChange}
            required
          />
          <Input
            label="Responsável Técnico"
            name="responsavelTecnico"
            placeholder="Veterinário / Biólogo Chefe[cite: 1]"
            icon={User}
            value={form.responsavelTecnico}
            onChange={handleChange}
            required
          />
          <Input
            label="Chave da Operação para Cifra"
            name="segredoOperacional"
            type="password"
            placeholder="Chave para gerar os blocos cifrados[cite: 1, 2]"
            icon={KeyRound}
            value={form.segredoOperacional}
            onChange={handleChange}
            required
          />
          <div style={{ marginTop: '8px' }}>
            <Button type="submit" loading={loading}>
              Salvar Registro Seguro[cite: 1]
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}