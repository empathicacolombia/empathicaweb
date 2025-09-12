import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BusinessSettings = ({ navigationProps }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  /**
   * Extrae el nombre de la compañía de los roles del usuario
   * @returns {string} - Nombre de la compañía o "Empresa" por defecto
   */
  const getCompanyName = () => {
    if (user && user.roles && user.roles.length > 1) {
      const companyRole = user.roles.find(role => role.startsWith('Company:'));
      if (companyRole) {
        return companyRole.replace('Company:', '');
      }
    }
    return 'Empresa';
  };

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>
        Configuración
      </span>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Sidebar de configuración */}
        <div style={{ width: 250, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', padding: '1.5rem' }}>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 16 }}>
            Configuración
          </div>
          
          {[
            { id: 'general', label: 'General', icon: '⚙️' },
            { id: 'billing', label: 'Facturación', icon: '💳' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '0.8rem 1rem',
                background: activeTab === tab.id ? '#e6f0ff' : 'transparent',
                color: activeTab === tab.id ? '#2050c7' : '#7a8bbd',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: activeTab === tab.id ? 700 : 500,
                marginBottom: 8,
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: 18 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de configuración */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', padding: '2rem' }}>
          {activeTab === 'general' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Configuración General</h3>
              
              <div style={{
                background: '#e6f0ff',
                border: '1px solid #bae6fd',
                borderRadius: 12,
                padding: '1rem',
                marginBottom: 24
              }}>
                <p style={{ color: '#0057ff', fontSize: 14, margin: 0 }}>
                  ℹ️ La información mostrada proviene de tu perfil de administrador y no puede ser modificada desde esta sección.
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Nombre de la Empresa
                  </label>
                  <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                    background: '#f8f9fa',
                    color: '#666'
                  }}>
                    {getCompanyName()}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Email de Contacto
                  </label>
                  <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                    background: '#f8f9fa',
                    color: '#666'
                  }}>
                    {user?.email || 'No disponible'}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Administrador
                  </label>
                  <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                    background: '#f8f9fa',
                    color: '#666'
                  }}>
                    {user ? `${user.name} ${user.lastName}` : 'No disponible'}
              </div>
            </div>

            <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Teléfono
                    </label>
                  <div style={{
                    width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: 12,
                        border: '1.5px solid #e0e7ef',
                        fontSize: 16,
                    background: '#f8f9fa',
                    color: '#666'
                  }}>
                    {user?.phoneNumber || 'No disponible'}
                  </div>
                </div>
              </div>
            </div>
          )}



          {activeTab === 'billing' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Facturación</h3>
              
              <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '2rem', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ color: '#222', fontWeight: 700, fontSize: 20 }}>Plan Empresarial</div>
                    <div style={{ color: '#7a8bbd', fontSize: 16 }}>500 empleados • $2,500/mes</div>
                  </div>
                  <span style={{
                    background: '#2ecc71',
                    color: '#fff',
                    padding: '0.3rem 0.8rem',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700
                  }}>
                    Activo
                  </span>
                </div>
                
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
