import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileWarning, 
  Lock, 
  Unlock, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Crosshair, 
  ShieldCheck 
} from 'lucide-react';
import DecryptModal from '../../components/common/DecryptModal';
import Button from '../../components/common/Button';
import { occurrencesService } from '../../services/occurrencesService';
import { formatDate } from '../../utils/formatters';
import styles from '../../styles/pages/occurrences/OccurrencesList.module.css';

// Registos simulados conforme o contrato de dados[cite: 3]
const OCORRENCIAS_INICIAIS = [
  {
    id: '8492',
    operacao_id: 'OP-2026-FNX',
    timestamp: '2026-10-13T04:12:00Z',
    bloco_cifrado: 'X9F2A881B7C0029E7D4C82A1098FEE61',
    decifrado: null, // Mantido apenas em memória de estado
  },
  {
    id: '8493',
    operacao_id: 'OP-2026-ARARA',
    timestamp: '2026-10-14T11:45:00Z',
    bloco_cifrado: '94CB0028AE7210FA667DCB89431102A7',
    decifrado: null,
  },
];

export default function OccurrencesList() {
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_INICIAIS);
  const [modalAberta, setModalAberta] = useState(false);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAbrirModal = (ocorrencia) => {
    setOcorrenciaSelecionada(ocorrencia);
    setModalAberta(true);
  };

  const handleDecifrar = async (segredo) => {
    setLoading(true);
    try {
      let resultado = null;
      try {
        // Tentativa de chamada à API do Back-end em Python[cite: 3]
        resultado = await occurrencesService.decrypt(ocorrenciaSelecionada.id, segredo);
      } catch {
        // Fallback simulado para desenvolvimento local em memória
        resultado = {
          localizacao: 'KM 42 Rod. dos Bandeirantes - Galpão 3',
          coordenadas: '-23.442, -46.918',
          agente_responsavel: 'Agente Sales',
          especies_identificadas: '14 Passeriformes (Curió e Canário-da-terra)',
        };
      }

      // Atualiza estritamente no estado do React (memória volátil)[cite: 1, 3]
      setOcorrencias((prev) =>
        prev.map((oc) =>
          oc.id === ocorrenciaSelecionada.id ? { ...oc, decifrado: resultado } : oc
        )
      );
      setModalAberta(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.title}>Ocorrências Registadas</h1>
          <p className={styles.subtitle}>
            Dados protegidos no banco por Cifra de Hill com chave dinâmica[cite: 1, 2]
          </p>
        </div>

        <Link to="/ocorrencias/nova" className={styles.newButton}>
          <PlusCircle size={18} />
          <span>Nova Ocorrência</span>
        </Link>
      </div>

      <div className={styles.list}>
        {ocorrencias.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.opTag}>{item.operacao_id}</span>
              <div className={styles.date}>
                <Calendar size={14} />
                <span>{formatDate(item.timestamp)}</span>
              </div>
            </div>

            {/* Bloco Cifrado (Estado Padrão em Repouso)[cite: 1, 3] */}
            <div className={styles.cipherBlock}>
              <span className={styles.cipherLabel}>
                <Lock size={14} /> Bloco Cifrado (Hexadecimal)
              </span>
              <div className={styles.cipherHex}>{item.bloco_cifrado}</div>
            </div>

            {/* Painel Decifrado (Apenas em Memória)[cite: 1, 3] */}
            {item.decifrado && (
              <div className={styles.decryptedBlock}>
                <span className={styles.decryptedTitle}>
                  <ShieldCheck size={16} /> Dados Operacionais Decifrados (Em Memória)[cite: 1, 3]
                </span>
                <div className={styles.decryptedInfo}>
                  <div>
                    <strong>Localização:</strong> {item.decifrado.localizacao}[cite: 3]
                  </div>
                  <div>
                    <strong>Coordenadas GPS:</strong> {item.decifrado.coordenadas}[cite: 1, 3]
                  </div>
                  <div>
                    <strong>Responsável:</strong> {item.decifrado.agente_responsavel}[cite: 3]
                  </div>
                  {item.decifrado.especies_identificadas && (
                    <div>
                      <strong>Apreensão:</strong> {item.decifrado.especies_identificadas}[cite: 1]
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.actionArea}>
              {!item.decifrado ? (
                <Button
                  onClick={() => handleAbrirModal(item)}
                  icon={Unlock}
                  fullWidth={false}
                >
                  Decifrar com Chave[cite: 1]
                </Button>
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                  ✓ Sessão Decifrada
                </span>
              )}
            </div>
          </div>
        ))}
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