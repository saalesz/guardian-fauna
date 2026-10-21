import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, PlusCircle, Users, Calendar } from 'lucide-react';
import styles from '../../styles/pages/operations/Operations.module.css';

const OPERACOES_MOCK = [
  { id: '1', nome: 'Operação Fênix', codigo: 'OP-2026-FNX', inicio: '10/10/2026', membros: 6, status: 'Ativa' },
  { id: '2', nome: 'Operação Voo Livre', codigo: 'OP-2026-ARARA', inicio: '05/10/2026', membros: 4, status: 'Ativa' },
  { id: '3', nome: 'Resgate Pantanal', codigo: 'OP-2026-PNT', inicio: '15/09/2026', membros: 8, status: 'Finalizada' },
];

export default function OperationsList() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Operações Cadastradas</h1>
          <p className={styles.subtitle}>Gerenciamento de missões ativas e controle de membros</p>
        </div>
        <Link to="/operacoes/nova" className={styles.linkButton}>
          <PlusCircle size={18} /> Nova Operação
        </Link>
      </div>

      <div className={styles.grid}>
        {OPERACOES_MOCK.map((op) => (
          <div key={op.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>{op.codigo}</span>
              <span className={styles.statusActive}>{op.status}</span>
            </div>
            <h3 className={styles.opName}>{op.nome}</h3>
            <div className={styles.membersArea}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Calendar size={14} /> Início: {op.inicio}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={14} /> Membros autorizados: {op.membros}[cite: 1]
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}