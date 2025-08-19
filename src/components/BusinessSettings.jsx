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
            { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
            { id: 'security', label: 'Seguridad', icon: '🔒' },
            { id: 'billing', label: 'Facturación', icon: '💳' },
            { id: 'integrations', label: 'Integraciones', icon: '🔗' }
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

          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Configuración de Notificaciones</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Notificaciones por email', description: 'Recibe actualizaciones importantes por email' },
                  { label: 'Notificaciones push', description: 'Recibe notificaciones en tiempo real' },
                  { label: 'Reportes semanales', description: 'Recibe reportes de actividad semanalmente' },
                  { label: 'Alertas de bienestar', description: 'Recibe alertas cuando los empleados reporten problemas' }
                ].map((setting, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: 12 }}>
                    <div>
                      <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{setting.label}</div>
                      <div style={{ color: '#7a8bbd', fontSize: 14 }}>{setting.description}</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: 50, height: 24 }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: '#0057ff',
                        borderRadius: 24,
                        transition: '0.4s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: 18,
                          width: 18,
                          left: 3,
                          bottom: 3,
                          background: '#fff',
                          borderRadius: '50%',
                          transition: '0.4s',
                          transform: 'translateX(26px)'
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Configuración de Seguridad</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <h4 style={{ color: '#222', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Cambiar Contraseña</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input
                      type="password"
                      placeholder="Contraseña actual"
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: 12,
                        border: '1.5px solid #e0e7ef',
                        fontSize: 16,
                        outline: 'none'
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: 12,
                        border: '1.5px solid #e0e7ef',
                        fontSize: 16,
                        outline: 'none'
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Confirmar nueva contraseña"
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: 12,
                        border: '1.5px solid #e0e7ef',
                        fontSize: 16,
                        outline: 'none'
                      }}
                    />
                    <button style={{
                      background: '#0057ff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      padding: '0.8rem 2rem',
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}>
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#222', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Autenticación de Dos Factores</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: 12 }}>
                    <div>
                      <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>Habilitar 2FA</div>
                      <div style={{ color: '#7a8bbd', fontSize: 14 }}>Añade una capa extra de seguridad a tu cuenta</div>
                    </div>
                    <button style={{
                      background: '#0057ff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.5rem 1rem',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Configurar
                    </button>
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
                
                <div style={{ display: 'flex', gap: 16 }}>
                  <button style={{
                    background: '#0057ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.5rem 1rem',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Cambiar Plan
                  </button>
                  <button style={{
                    background: '#fff',
                    color: '#7a8bbd',
                    border: '1.5px solid #e0e7ef',
                    borderRadius: 8,
                    padding: '0.5rem 1rem',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Ver Facturas
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Integraciones</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Slack', description: 'Sincroniza notificaciones con Slack', status: 'Conectado' },
                  { name: 'Microsoft Teams', description: 'Integra con Microsoft Teams', status: 'Disponible' },
                  { name: 'Google Workspace', description: 'Sincroniza con Google Workspace', status: 'Disponible' },
                  { name: 'Zoom', description: 'Integra sesiones con Zoom', status: 'Disponible' }
                ].map((integration, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8f9fa', borderRadius: 12 }}>
                    <div>
                      <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{integration.name}</div>
                      <div style={{ color: '#7a8bbd', fontSize: 14 }}>{integration.description}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        background: integration.status === 'Conectado' ? '#e6f7e6' : '#f8f9fa',
                        color: integration.status === 'Conectado' ? '#2ecc71' : '#7a8bbd',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {integration.status}
                      </span>
                      <button style={{
                        background: integration.status === 'Conectado' ? '#ff4444' : '#0057ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '0.5rem 1rem',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        {integration.status === 'Conectado' ? 'Desconectar' : 'Conectar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
