import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusCircle, Lock, Shield } from 'lucide-react';
import styles from '../../styles/pages/shelters/Shelters.module.css';

const ABRIGOS_MOCK = [
  {
    id: '1',
    nome_publico: 'CETAS - Centro de Triagem Litoral',
    especies: 'Aves silvestres, Pequenos Primatas',
    status: 'Capacidade Operacional: 80%',
    bloco_cifrado: 'A03B82FE11C289...',
  },
  {
    id: '2',
    nome_publico: 'Abrigo Parque das Neblinas',
    especies: 'Répteis e Mamíferos de grande porte',
    status: 'Capacidade Operacional: 45%',
    bloco_cifrado: 'BB7729901AC871...',
  },
];

export default function SheltersList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Abrigos e CETAS</h1>
          <p className={styles.subtitle}>
            Locais de acolhimento e soltura. Endereços mantidos sob sigilo criptográfico[cite: 1].
          </p>
        </div>
        <Link to="/abrigos/novo" className={styles.button}>
          <PlusCircle size={18} /> Cadastrar Abrigo
        </Link>
      </div>

      <div className={styles.list}>
        {ABRIGOS_MOCK.map((ab) => (
          <div key={ab.id} className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc' }}>{ab.nome_publico}</h3>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{ab.status}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              <strong>Espécies atendidas:</strong> {ab.especies}[cite: 2]
            </p>
            <div className={styles.cipherWarning}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#eab308', marginBottom: '4px' }}>
                <Lock size={14} /> Endereço e Responsáveis Técnicos Cifrados[cite: 1]
              </div>
              <code>{ab.bloco_cifrado}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}