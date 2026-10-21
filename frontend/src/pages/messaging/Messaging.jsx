import React, { useState } from 'react';
import { Send, Shield, Lock, Unlock } from 'lucide-react';
import Button from '../../components/common/Button';
import styles from '../../styles/pages/messaging/Messaging.module.css';

export default function Messaging() {
  const [decifrado, setDecifrado] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [conversas, setConversas] = useState([
    {
      id: 1,
      remetente: 'Coordenador Silva',
      tipo: 'recebida',
      textoClaro: 'Equipe, viatura a caminho do cativeiro suspeito.',
      textoCifrado: 'B7819AA81C9902FF182E9...',
    },
    {
      id: 2,
      remetente: 'Você (Agente)',
      tipo: 'enviada',
      textoClaro: 'Entendido. Aguardando sinal para abordagem conjunta.',
      textoCifrado: 'CC10988A7210FFE87311B...',
    },
  ]);

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    setConversas((prev) => [
      ...prev,
      {
        id: Date.now(),
        remetente: 'Você (Agente)',
        tipo: 'enviada',
        textoClaro: mensagem,
        textoCifrado: '992FA08C123EEB401929...',
      },
    ]);
    setMensagem('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc' }}>
            Chat Tático da Operação OP-2026-FNX[cite: 1]
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Canal de Mensagens Cifradas[cite: 1]
          </span>
        </div>

        <button
          onClick={() => setDecifrado((prev) => !prev)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: decifrado ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)',
            color: decifrado ? '#34d399' : '#eab308',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          {decifrado ? <Unlock size={14} /> : <Lock size={14} />}
          {decifrado ? 'Modo Decifrado (Memória)' : 'Ver Cifrado[cite: 1]'}
        </button>
      </div>

      <div className={styles.messagesList}>
        {conversas.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageCard} ${msg.tipo === 'enviada' ? styles.sent : styles.received}`}
          >
            <span className={styles.sender}>{msg.remetente}</span>
            {decifrado ? (
              <span style={{ color: '#f8fafc' }}>{msg.textoClaro}</span>
            ) : (
              <span className={styles.cipherText}>[Cifra Hill]: {msg.textoCifrado}</span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleEnviar} className={styles.inputArea}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Digite a mensagem segura..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        />
        <Button type="submit" icon={Send} fullWidth={false}>
          Enviar
        </Button>
      </form>
    </div>
  );
}