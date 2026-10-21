import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, FileWarning, ShieldAlert, PlusCircle, MessageSquare } from 'lucide-react';
import styles from '../../styles/pages/dashboard/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Painel Operacional</h1>
        <p className={styles.subtitle}>Visão consolidada de combate ao tráfico e status de ocorrências</p>
      </div>

      {/* Cards de Métricas */}
      <div className={styles.metricsGrid}>
        <div className={styles.card}>
          <div className={styles.cardInfo}>
            <span className={styles.cardLabel}>Operações Ativas</span>
            <span className={styles.cardValue}>4</span>
          </div>
          <div className={styles.cardIcon} style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
            <Briefcase size={24} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardInfo}>
            <span className={styles.cardLabel}>Ocorrências Registradas</span>
            <span className={styles.cardValue}>18</span>
          </div>
          <div className={styles.cardIcon} style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
            <FileWarning size={24} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardInfo}>
            <span className={styles.cardLabel}>Dados Cifrados no Banco</span>
            <span className={styles.cardValue}>100%</span>
          </div>
          <div className={styles.cardIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <ShieldAlert size={24} />
          </div>
        </div>
      </div>

      {/* Atalhos Rápidos */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ações Rápidas</h2>
        <div className={styles.actionsGrid}>
          <Link to="/ocorrencias/nova" className={styles.actionButton}>
            <PlusCircle size={20} color="#10b981" />
            <span>Registrar Nova Ocorrência</span>
          </Link>
          <Link to="/ocorrencias" className={styles.actionButton}>
            <FileWarning size={20} color="#eab308" />
            <span>Consultar Registros Cifrados</span>
          </Link>
          <Link to="/mensageria" className={styles.actionButton}>
            <MessageSquare size={20} color="#38bdf8" />
            <span>Canal Seguro de Mensageria</span>
          </Link>
        </div>
      </div>
    </div>
  );
}