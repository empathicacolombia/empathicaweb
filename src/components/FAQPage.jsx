import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ========================================
 * PÁGINA DE PREGUNTAS FRECUENTES (FAQ)
 * ======================================== 
 * Proporciona respuestas a las preguntas más comunes sobre Empathica
 * Incluye búsqueda, categorías y navegación intuitiva
 */

const FAQPage = ({ navigationProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('Todas');

  // Categorías de FAQ
  const categories = [
    'Todas',
    'Cuenta y Registro',
    'Sesiones y Terapia',
    'Pagos y Facturación',
    'Privacidad y Seguridad',
    'Tecnología y Soporte'
  ];

  // Datos de FAQ organizados por categorías
  const faqData = [
    {
      id: 1,
      category: 'Cuenta y Registro',
      question: '¿Cómo puedo crear una cuenta en Empathica?',
      answer: 'Para crear una cuenta, ve a la página principal y haz clic en "Registrarse". Completa el formulario con tu información personal y sigue los pasos de verificación por email. El proceso toma menos de 5 minutos.'
    },
    {
      id: 2,
      category: 'Cuenta y Registro',
      question: '¿Puedo cambiar mi información personal después del registro?',
      answer: 'Sí, puedes actualizar tu información personal en cualquier momento desde tu perfil. Ve a "Mi Perfil" y haz clic en "Editar" para modificar tus datos.'
    },
    {
      id: 3,
      category: 'Sesiones y Terapia',
      question: '¿Cómo funcionan las sesiones de terapia en línea?',
      answer: 'Las sesiones se realizan a través de videollamada segura. Recibirás un enlace antes de cada sesión. Solo necesitas una conexión estable a internet y un dispositivo con cámara y micrófono.'
    },
    {
      id: 4,
      category: 'Sesiones y Terapia',
      question: '¿Qué pasa si necesito cancelar una sesión?',
      answer: 'Puedes cancelar tu sesión hasta 24 horas antes sin costo. Las cancelaciones con menos de 24 horas de anticipación pueden tener un cargo. Contacta a soporte para casos de emergencia.'
    },
    {
      id: 5,
      category: 'Sesiones y Terapia',
      question: '¿Cómo se asigna mi psicólogo?',
      answer: 'Utilizamos un algoritmo de matching que considera tus necesidades, preferencias y el perfil del psicólogo. También puedes elegir manualmente de nuestra lista de profesionales verificados.'
    },
    {
      id: 6,
      category: 'Pagos y Facturación',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito, transferencias bancarias y PayPal. Todos los pagos son procesados de forma segura y encriptada.'
    },
    {
      id: 7,
      category: 'Pagos y Facturación',
      question: '¿Ofrecen reembolsos?',
      answer: 'Sí, ofrecemos reembolsos completos dentro de los primeros 30 días si no estás satisfecho con nuestro servicio. Contacta a soporte para iniciar el proceso.'
    },
    {
      id: 8,
      category: 'Pagos y Facturación',
      question: '¿Puedo cambiar mi plan de suscripción?',
      answer: 'Sí, puedes cambiar tu plan en cualquier momento desde tu dashboard. Los cambios se aplican al siguiente ciclo de facturación.'
    },
    {
      id: 9,
      category: 'Privacidad y Seguridad',
      question: '¿Mis sesiones son confidenciales?',
      answer: 'Absolutamente. Todas las sesiones están protegidas por el secreto profesional y cumplimos con las leyes de privacidad médica. Tu información nunca se comparte sin tu consentimiento.'
    },
    {
      id: 10,
      category: 'Privacidad y Seguridad',
      question: '¿Cómo protegen mis datos personales?',
      answer: 'Utilizamos encriptación de nivel bancario y cumplimos con estándares internacionales de seguridad. Tus datos están almacenados en servidores seguros y solo accesibles por personal autorizado.'
    },
    {
      id: 11,
      category: 'Tecnología y Soporte',
      question: '¿Qué necesito para usar Empathica?',
      answer: 'Necesitas un dispositivo (computadora, tablet o smartphone) con conexión a internet, cámara web y micrófono. Nuestra plataforma funciona en todos los navegadores modernos.'
    },
    {
      id: 12,
      category: 'Tecnología y Soporte',
      question: '¿Qué hago si tengo problemas técnicos?',
      answer: 'Nuestro equipo de soporte está disponible 24/7. Puedes contactarnos por chat en vivo, email o teléfono. También tenemos una sección de ayuda con guías paso a paso.'
    }
  ];

  // Filtrar FAQ por categoría y término de búsqueda
  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = activeCategory === 'Todas' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Alternar expansión de un item
  const toggleItem = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Navegar de vuelta
  const handleGoBack = () => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('business-demo-dashboard');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#fff', 
        borderRadius: 20, 
        padding: '2rem', 
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <button
            onClick={handleGoBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#7a8bbd',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <ArrowLeft size={20} />
            Volver
          </button>
        </div>
        
        <h1 style={{ 
          color: '#222', 
          fontWeight: 800, 
          fontSize: 36, 
          marginBottom: 12,
          textAlign: 'center'
        }}>
          Preguntas Frecuentes
        </h1>
        <p style={{ 
          color: '#7a8bbd', 
          fontSize: 18, 
          textAlign: 'center',
          marginBottom: 32
        }}>
          Encuentra respuestas rápidas a las preguntas más comunes sobre Empathica
        </p>

        {/* Barra de búsqueda */}
        <div style={{ 
          position: 'relative', 
          maxWidth: 600, 
          margin: '0 auto 2rem auto' 
        }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: 16, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#7a8bbd' 
            }} 
          />
          <input
            type="text"
            placeholder="Buscar en preguntas frecuentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              borderRadius: 16,
              border: '2px solid #e0e7ef',
              fontSize: 16,
              outline: 'none',
              background: '#fafbfc'
            }}
          />
        </div>

        {/* Categorías */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: 24
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                background: activeCategory === category ? '#0057ff' : '#fff',
                color: activeCategory === category ? '#fff' : '#222',
                border: '2px solid #e0e7ef',
                borderRadius: 12,
                padding: '0.8rem 1.5rem',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de FAQ */}
      <div style={{ 
        background: '#fff', 
        borderRadius: 20, 
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        {filteredFAQ.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredFAQ.map((item) => (
              <div key={item.id} style={{ 
                border: '1px solid #e0e7ef', 
                borderRadius: 16,
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => toggleItem(item.id)}
                  style={{
                    width: '100%',
                    background: '#fafbfc',
                    border: 'none',
                    padding: '1.5rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      color: '#222', 
                      fontWeight: 700, 
                      fontSize: 18, 
                      marginBottom: 4 
                    }}>
                      {item.question}
                    </h3>
                    <span style={{ 
                      color: '#7a8bbd', 
                      fontSize: 14, 
                      fontWeight: 600 
                    }}>
                      {item.category}
                    </span>
                  </div>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp size={20} color="#7a8bbd" />
                  ) : (
                    <ChevronDown size={20} color="#7a8bbd" />
                  )}
                </button>
                
                {expandedItems.has(item.id) && (
                  <div style={{ 
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    background: '#fff'
                  }}>
                    <p style={{ 
                      color: '#7a8bbd', 
                      fontSize: 16, 
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#7a8bbd',
            fontSize: 16
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p>No se encontraron resultados para tu búsqueda.</p>
            <p>Intenta con otros términos o revisa las categorías disponibles.</p>
          </div>
        )}
      </div>

      {/* Footer de ayuda */}
      <div style={{ 
        background: '#fff', 
        borderRadius: 20, 
        padding: '2rem',
        marginTop: '2rem',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ 
          color: '#222', 
          fontWeight: 700, 
          fontSize: 24, 
          marginBottom: 12 
        }}>
          ¿No encontraste lo que buscabas?
        </h3>
        <p style={{ 
          color: '#7a8bbd', 
          fontSize: 16, 
          marginBottom: 24 
        }}>
          Nuestro equipo de soporte está aquí para ayudarte
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.open('https://wa.me/1234567890?text=Hola,%20necesito%20ayuda%20con%20Empathica', '_blank')}
            style={{
              background: '#25d366',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '1rem 2rem',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            💬 Chat en vivo
          </button>
          <button
            onClick={() => window.open('mailto:soporte@empathica.com', '_blank')}
            style={{
              background: '#0057ff',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '1rem 2rem',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            📧 Enviar email
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 