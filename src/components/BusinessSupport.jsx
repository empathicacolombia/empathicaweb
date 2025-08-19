import React, { useState } from 'react';

const BusinessSupport = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se enviaría el formulario al backend
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado exitosamente. Nos pondremos en contacto contigo pronto.');
    setFormData({
      subject: '',
      message: '',
      priority: 'medium',
      category: 'general'
    });
  };

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>
        Soporte
      </span>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Sidebar de opciones */}
        <div style={{ width: 250, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', padding: '1.5rem' }}>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 16 }}>
            Centro de Ayuda
          </div>
          
          {[
            { id: 'contact', label: 'Contactar Soporte', icon: '📞' },
            { id: 'faq', label: 'Preguntas Frecuentes', icon: '❓' },
            { id: 'resources', label: 'Recursos', icon: '📚' },
            { id: 'status', label: 'Estado del Sistema', icon: '🔍' }
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

          {/* Información de contacto */}
          <div style={{ marginTop: 32, padding: '1rem', background: '#f8f9fa', borderRadius: 12 }}>
            <div style={{ color: '#222', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
              Contacto Directo
            </div>
            <div style={{ color: '#7a8bbd', fontSize: 14, marginBottom: 8 }}>
              📧 miguel@nitbit.mx
            </div>
            <div style={{ color: '#7a8bbd', fontSize: 14, marginBottom: 8 }}>
              📱 +52 55 1234 5678
            </div>
            <div style={{ color: '#7a8bbd', fontSize: 14 }}>
              🕒 Lun-Vie 9:00-18:00
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', padding: '2rem' }}>
          {activeTab === 'contact' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Contactar Soporte</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Categoría
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="general">General</option>
                    <option value="technical">Problema Técnico</option>
                    <option value="billing">Facturación</option>
                    <option value="feature">Solicitud de Función</option>
                    <option value="bug">Reporte de Error</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Describe brevemente tu consulta"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Prioridad
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe detalladamente tu consulta o problema..."
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#0057ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '1rem 2rem',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          )}

          {activeTab === 'faq' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Preguntas Frecuentes</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  {
                    question: '¿Cómo puedo agregar más empleados a mi cuenta?',
                    answer: 'Puedes agregar empleados desde la sección "Colaboradores" en tu dashboard. También puedes subir un archivo CSV con la información de tus empleados.'
                  },
                  {
                    question: '¿Qué incluye el plan empresarial?',
                    answer: 'El plan empresarial incluye acceso completo a todas las funcionalidades, soporte prioritario, reportes avanzados y hasta 500 empleados.'
                  },
                  {
                    question: '¿Cómo funcionan los toolkits?',
                    answer: 'Los toolkits son recursos de desarrollo personal que puedes asignar a tus empleados. Incluyen ejercicios, videos y actividades prácticas.'
                  },
                  {
                    question: '¿Puedo exportar los reportes?',
                    answer: 'Sí, todos los reportes pueden ser exportados en formato PDF o Excel desde la sección "Reportes" de tu dashboard.'
                  },
                  {
                    question: '¿Qué medidas de seguridad tienen?',
                    answer: 'Utilizamos encriptación de extremo a extremo, cumplimos con GDPR y contamos con certificaciones de seguridad internacionales.'
                  }
                ].map((faq, index) => (
                  <div key={index} style={{
                    background: '#f8f9fa',
                    borderRadius: 12,
                    padding: '1.5rem',
                    border: '1px solid #e0e7ef'
                  }}>
                    <h4 style={{
                      color: '#222',
                      fontWeight: 700,
                      fontSize: 16,
                      margin: '0 0 8px 0'
                    }}>
                      {faq.question}
                    </h4>
                    <p style={{
                      color: '#7a8bbd',
                      fontSize: 14,
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Recursos de Ayuda</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {[
                  {
                    title: 'Guía de Inicio Rápido',
                    description: 'Aprende a configurar tu cuenta en menos de 10 minutos',
                    icon: '🚀',
                    type: 'PDF',
                    size: '2.3 MB'
                  },
                  {
                    title: 'Manual de Usuario',
                    description: 'Guía completa de todas las funcionalidades',
                    icon: '📖',
                    type: 'PDF',
                    size: '8.7 MB'
                  },
                  {
                    title: 'Video Tutoriales',
                    description: 'Videos explicativos de las principales funciones',
                    icon: '🎥',
                    type: 'Video',
                    size: '15 min'
                  },
                  {
                    title: 'Plantillas de Reportes',
                    description: 'Plantillas personalizables para tus reportes',
                    icon: '📊',
                    type: 'Excel',
                    size: '1.2 MB'
                  }
                ].map((resource, index) => (
                  <div key={index} style={{
                    background: '#f8f9fa',
                    borderRadius: 12,
                    padding: '1.5rem',
                    border: '1px solid #e0e7ef',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <span style={{ fontSize: 24 }}>{resource.icon}</span>
                      <div>
                        <h4 style={{
                          color: '#222',
                          fontWeight: 700,
                          fontSize: 16,
                          margin: '0 0 4px 0'
                        }}>
                          {resource.title}
                        </h4>
                        <span style={{
                          background: '#e6f0ff',
                          color: '#0057ff',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <p style={{
                      color: '#7a8bbd',
                      fontSize: 14,
                      lineHeight: 1.4,
                      margin: '0 0 12px 0'
                    }}>
                      {resource.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#7a8bbd', fontSize: 12 }}>
                        Tamaño: {resource.size}
                      </span>
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
                        Descargar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Estado del Sistema</h3>
              
              <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '2rem', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 12,
                    height: 12,
                    background: '#2ecc71',
                    borderRadius: '50%'
                  }} />
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 18 }}>
                    Todos los sistemas operativos
                  </span>
                </div>
                <p style={{ color: '#7a8bbd', fontSize: 14, margin: 0 }}>
                  Última actualización: Hace 5 minutos
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                {[
                  { service: 'Aplicación Web', status: 'Operativo', color: '#2ecc71' },
                  { service: 'API', status: 'Operativo', color: '#2ecc71' },
                  { service: 'Base de Datos', status: 'Operativo', color: '#2ecc71' },
                  { service: 'Notificaciones', status: 'Operativo', color: '#2ecc71' },
                  { service: 'Reportes', status: 'Operativo', color: '#2ecc71' },
                  { service: 'Integraciones', status: 'Operativo', color: '#2ecc71' }
                ].map((service, index) => (
                  <div key={index} style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '1rem',
                    border: '1px solid #e0e7ef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#222', fontWeight: 600, fontSize: 14 }}>
                      {service.service}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        background: service.color,
                        borderRadius: '50%'
                      }} />
                      <span style={{
                        color: service.color,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {service.status}
                      </span>
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

export default BusinessSupport;
