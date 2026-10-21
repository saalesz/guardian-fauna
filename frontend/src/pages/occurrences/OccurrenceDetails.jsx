import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock, Unlock, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button';
import DecryptModal from '../../components/common/DecryptModal';
import styles from '../../styles/pages/occurrences/OccurrenceDetails.module.css';

export default function OccurrenceDetails() {
  const { id } = useParams();
  const [modalAberta, setModalAberta] = useState(false);
  const [decifrado, setDecifrado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDecifrar = (segredo) => {
    setLoading(true);
    setTimeout(() => {
      setDecifrado({
        localizacao: 'Fazenda Rio Verde, Galpão B',
        coordenadas: '-22.903, -47.056',
        agente_responsavel: 'Agente Carlos Silva',
        especies: '8 Araras Canindé e 12 Papagaios-verdadeiros',
      });
      setLoading(false);
      setModalAberta(false);
    }, 600);
  };

  return (
    <div className={styles.container}>
      <Link to="/ocorrencias" className={styles.backBtn}>
        <ArrowLeft size={16} /> Voltar para Ocorrências
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ocorrência #{id || '8492'}</h1>
          <span className={styles.tag}>Operação OP-2026-FNX</span>
        </div>

        <div>
          <span style={{ fontSize: '0.8rem', color: '#eab308', fontWeight: 600 }}>
            Bloco Hexadecimal em Repouso[cite: 1, 3]
          </span>
          <div className={styles.block}>
            X9F2A881B7C0029E7D4C82A1098FEE61A9908FCD20138AA1B994
          </div>
        </div>

        {decifrado ? (
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '6px', border: '1px solid #10b981' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={18} /> Conteúdo Sensível Decifrado em Memória[cite: 1, 3]
            </h3>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Local:</strong> {decifrado.localizacao}[cite: 3]</p>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>GPS:</strong> {decifrado.coordenadas}[cite: 1, 3]</p>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Agente:</strong> {decifrado.agente_responsavel}[cite: 3]</p>
            <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>Apreensão:</strong> {decifrado.especies}</p>
          </div>
        ) : (
          <div>
            <Button icon={Unlock} onClick={() => setModalAberta(true)} fullWidth={false}>
              Decifrar Ocorrência
            </Button>
          </div>
        )}
      </div>

      <DecryptModal
        isOpen={modalAberta}
        onClose={() => setModalAberta(false)}
        onConfirm={handleDecifrar}
        loading={loading}
      />
    </div>
  );
}