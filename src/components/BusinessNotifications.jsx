import React, { useState } from 'react';

const BusinessNotifications = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Datos de notificaciones
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Alto nivel de estrés detectado',
      message: '15 empleados del departamento de Marketing han reportado niveles críticos de estrés',
      time: 'Hace 2 horas',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'report',
      title: 'Reporte semanal disponible',
      message: 'El reporte de bienestar semanal está listo para revisión',
      time: 'Hace 1 día',
      read: true,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Meta de sesiones alcanzada',
      message: 'Se ha alcanzado el 85% de la meta de sesiones para este mes',
      time: 'Hace 2 días',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'update',
      title: 'Nuevo toolkit disponible',
      message: 'El toolkit "Gestión del Tiempo" ya está disponible para todos los empleados',
      time: 'Hace 3 días',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Baja participación detectada',
      message: 'El departamento de Finanzas muestra baja participación en las sesiones',
      time: 'Hace 4 días',
      read: false,
      priority: 'high'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ff9800';
      case 'low': return '#2ecc71';
      default: return '#7a8bbd';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert': return '🚨';
      case 'report': return '📊';
      case 'success': return '✅';
      case 'update': return '🆕';
      default: return '📢';
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.priority === activeTab);

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>
        Notificaciones
      </span>

      {/* Estadísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#0057ff', fontWeight: 700, fontSize: 17 }}>{notifications.length}</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Total Notificaciones</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Todas las notificaciones</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#ff4444', fontWeight: 800, fontSize: 17 }}>{notifications.filter(n => !n.read).length}</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>No Leídas</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Pendientes de revisión</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#ff9800', fontWeight: 800, fontSize: 17 }}>{notifications.filter(n => n.priority === 'high').length}</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Alta Prioridad</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Requieren atención</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#2ecc71', fontWeight: 800, fontSize: 17 }}>95%</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Tiempo Respuesta</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Promedio 2 horas</div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { id: 'all', label: 'Todas', count: notifications.length },
          { id: 'unread', label: 'No leídas', count: notifications.filter(n => !n.read).length },
          { id: 'high', label: 'Alta prioridad', count: notifications.filter(n => n.priority === 'high').length },
          { id: 'medium', label: 'Media prioridad', count: notifications.filter(n => n.priority === 'medium').length },
          { id: 'low', label: 'Baja prioridad', count: notifications.filter(n => n.priority === 'low').length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.6rem 1.2rem',
              background: activeTab === tab.id ? '#0057ff' : '#fff',
              color: activeTab === tab.id ? '#fff' : '#7a8bbd',
              border: activeTab === tab.id ? 'none' : '1.5px solid #e0e7ef',
              borderRadius: 12,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeTab === tab.id ? 700 : 500
            }}
          >
            {tab.label}
            <span style={{
              background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : '#f8f9fa',
              color: activeTab === tab.id ? '#fff' : '#7a8bbd',
              padding: '0.2rem 0.6rem',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Lista de notificaciones */}
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', overflow: 'hidden' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#7a8bbd', fontSize: 18 }}>
            No hay notificaciones que coincidan con el filtro seleccionado.
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '1.5rem',
                borderBottom: '1px solid #e0e7ef',
                background: notification.read ? '#fff' : '#f8f9fa',
                position: 'relative'
              }}
            >
              {/* Indicador de no leída */}
              {!notification.read && (
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1rem',
                  width: 8,
                  height: 8,
                  background: '#0057ff',
                  borderRadius: '50%'
                }} />
              )}

              {/* Icono */}
              <div style={{
                width: 48,
                height: 48,
                background: '#f8f9fa',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginLeft: notification.read ? 0 : 16
              }}>
                {getTypeIcon(notification.type)}
              </div>

              {/* Contenido */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <h4 style={{
                    margin: 0,
                    color: '#222',
                    fontWeight: 700,
                    fontSize: 16
                  }}>
                    {notification.title}
                  </h4>
                  <span style={{
                    background: getPriorityColor(notification.priority),
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 8,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  color: '#7a8bbd',
                  fontSize: 14,
                  lineHeight: 1.4,
                  marginBottom: 8
                }}>
                  {notification.message}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ color: '#7a8bbd', fontSize: 12 }}>
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#0057ff',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}>
                      Marcar como leída
                    </button>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button style={{
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.4rem 0.8rem',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Ver Detalles
                </button>
                <button style={{
                  background: 'none',
                  color: '#7a8bbd',
                  border: '1px solid #e0e7ef',
                  borderRadius: 8,
                  padding: '0.4rem 0.8rem',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Archivar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Acciones masivas */}
      {filteredNotifications.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button style={{
            background: '#0057ff',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '0.8rem 1.5rem',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Marcar todas como leídas
          </button>
          <button style={{
            background: '#fff',
            color: '#7a8bbd',
            border: '1.5px solid #e0e7ef',
            borderRadius: 12,
            padding: '0.8rem 1.5rem',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Archivar todas
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessNotifications;
