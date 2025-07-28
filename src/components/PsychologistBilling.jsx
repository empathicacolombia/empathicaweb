import React, { useState } from 'react';
import { FileText, Calendar, TrendingUp, Download, Eye, Plus, DollarSign } from 'lucide-react';

const metrics = [
  { label: 'Ingresos este mes', value: '$12,500', icon: <DollarSign size={22} />, change: '+15% vs mes anterior', color: '#0057FF' },
  { label: 'Sesiones facturadas', value: 25, icon: <Calendar size={22} />, change: '+8% vs mes anterior', color: '#a259e6' },
  { label: 'Ingresos promedio', value: '$500', icon: <TrendingUp size={22} />, change: '+5% vs mes anterior', color: '#2ecc71' },
  { label: 'Facturas pendientes', value: 3, icon: <FileText size={22} />, change: '-2 vs mes anterior', color: '#6ea8fe' },
];

const tabs = ['Facturas', 'Pagos', 'Reportes'];

const invoices = [
  {
    id: 'INV-001',
    name: 'Ana García',
    date: '2024-07-15',
    type: 'Presencial',
    sessions: 1,
    amount: '$500',
    status: 'Pagada',
  },
  {
    id: 'INV-002',
    name: 'Carlos Mendoza',
    date: '2024-07-14',
    type: 'Video llamada',
    sessions: 1,
    amount: '$450',
    status: 'Pendiente',
  },
  {
    id: 'INV-003',
    name: 'María López',
    date: '2024-07-13',
    type: 'Presencial',
    sessions: 1,
    amount: '$500',
    status: 'Pagada',
  },
  {
    id: 'INV-004',
    name: 'Pedro Ruiz',
    date: '2024-07-12',
    type: 'Video llamada',
    sessions: 1,
    amount: '$450',
    status: 'Pagada',
  },
];

const PsychologistBilling = () => {
  const [activeTab, setActiveTab] = useState('Facturas');

  return (
    <div>
      {/* Título, subtítulo y nueva factura */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 32 }}>Facturación</div>
          <div style={{ color: '#7a8bbd', fontSize: 16, marginTop: 2 }}>Gestiona tus ingresos y facturas</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 16, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22' }}>
          <FileText size={20} /> Nueva factura
        </button>
      </div>
      {/* Métricas superiores */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ef', padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: m.color, fontWeight: 700, fontSize: 18 }}>{m.icon} {m.value}</div>
            <div style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 15 }}>{m.label}</div>
            <div style={{ color: '#2ecc71', fontSize: 14, fontWeight: 600 }}>{m.change}</div>
          </div>
        ))}
      </div>
      {/* Tabs internos */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: activeTab === tab ? '#fff' : 'transparent',
            color: activeTab === tab ? '#0057FF' : '#7a8bbd',
            border: activeTab === tab ? '2px solid #0057FF' : 'none',
            borderRadius: activeTab === tab ? 16 : 0,
            fontWeight: 700,
            fontSize: 18,
            padding: '0.7rem 2.2rem',
            marginRight: 4,
            boxShadow: activeTab === tab ? '0 2px 8px #e0e7ef' : 'none',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s',
          }}>{tab}</button>
        ))}
      </div>
      {/* Lista de facturas */}
      {activeTab === 'Facturas' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>Facturas Recientes</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#0057FF', border: '1.5px solid #e0e7ef', borderRadius: 16, padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
              <Download size={20} /> Exportar
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {invoices.map((inv, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#e6f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={32} color="#6ea8fe" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>{inv.id}</div>
                    <div style={{ color: '#7a8bbd', fontSize: 15, marginBottom: 4 }}>{inv.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#7a8bbd', fontSize: 15 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={16} /> {inv.date}</span>
                      <span>{inv.type}</span>
                      <span>{inv.sessions} sesión(es)</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                  <span style={{ color: '#0057FF', fontWeight: 800, fontSize: 20 }}>{inv.amount}</span>
                  <span style={{ background: inv.status === 'Pagada' ? '#e6ffe6' : '#fffbe6', color: inv.status === 'Pagada' ? '#2ecc71' : '#ffb300', fontWeight: 700, fontSize: 14, borderRadius: 8, padding: '0.2rem 1rem' }}>{inv.status}</span>
                  <button style={{ background: '#fff', color: '#222', border: '1.5px solid #e0e7ef', borderRadius: 12, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #e0e7ef', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Eye size={16} /> Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Puedes agregar placeholders para Pagos y Reportes si lo deseas */}
    </div>
  );
};

export default PsychologistBilling; 