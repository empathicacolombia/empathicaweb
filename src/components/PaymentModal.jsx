import React, { useState, useEffect } from 'react';
import { CreditCard, X, CheckCircle, Shield, Clock, Users } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { appointmentService } from '../services/api';

/**
 * Modal de cobro profesional para pacientes de Empathica
 * Se muestra antes de agendar cita con integración PayPal real
 */
const PaymentModal = ({ isOpen, onClose, onContinue, isLoading = false }) => {
  const [message, setMessage] = useState('');

  // PayPal usa la configuración global de AppMain.js

  // Efecto para limpiar mensajes cuando el modal se abre/cierra
  useEffect(() => {
    if (isOpen) {
      setMessage('');
    } else {
      setMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Función para crear la orden en PayPal
  const createOrder = async () => {
    try {
      console.log("=== INICIANDO CREACIÓN DE ORDEN ===");
      setMessage("Creando orden de pago...");
      
      // Enviar objeto vacío 
      const response = await appointmentService.createPaymentOrder({});
      console.log("Orden creada en backend:", response);
      
      const orderId = response.orderId || response.id;
      console.log("Order ID a retornar:", orderId);
      
      setMessage("");
      return orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      console.error("Detalles del error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      setMessage("Error al crear la orden de pago");
      throw error;
    }
  };

  // Función para manejar la aprobación del pago
  const onApprove = async (data, actions) => {
    try {
      console.log("Pago aprobado por PayPal:", data);
      setMessage("Procesando pago...");
      
      // Capturar el pago en el backend
      const captureResponse = await appointmentService.capturePaymentOrder(data.orderID);
      console.log("Pago capturado en backend:", captureResponse);
      
      setMessage("¡Pago exitoso! Ahora puedes seleccionar tu horario...");
      console.log("Pago procesado exitosamente");
      
      // Llamamos a onContinue para continuar con la selección de horario
      setTimeout(() => {
        onContinue();
      }, 1500);
      
    } catch (error) {
      console.error("Error processing payment:", error);
      console.error("Detalles del error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      setMessage("Error al procesar el pago. Inténtalo de nuevo.");
    }
  };

  // Función para manejar errores
  const onError = (err) => {
    console.error("=== PAYPAL ERROR ===");
    console.error("Error completo:", err);
    console.error("Tipo de error:", typeof err);
    console.error("Mensaje:", err.message || err);
    setMessage("Error en el proceso de pago. Inténtalo de nuevo.");
  };

  // Función para manejar cancelaciones
  const onCancel = (data) => {
    console.log("=== PAYPAL CANCELADO ===");
    console.log("Datos de cancelación:", data);
    setMessage("Pago cancelado");
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        maxWidth: 400,
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header del modal */}
        <div style={{
          padding: '1.25rem 1.25rem 0.75rem 1.25rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#0057FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CreditCard size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#333',
                margin: '0 0 0.25rem 0'
              }}>
                Información de Pago
              </h2>
              <p style={{
                fontSize: 13,
                color: '#666',
                margin: 0
              }}>
                Pago previo para agendar tu sesión
              </p>
            </div>
          </div>
          
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenido del modal */}
        <div style={{
          padding: '1.25rem'
        }}>
          {/* Resumen de la sesión */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 12,
            padding: '1.25rem',
            marginBottom: '1.25rem',
            color: '#fff',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: 28,
              marginBottom: '0.5rem'
            }}>
              🧠
            </div>
            <h3 style={{
              fontSize: 18,
              fontWeight: 700,
              margin: '0 0 0.5rem 0',
              color: '#fff'
            }}>
              Pago por Sesión de Terapia
            </h3>
            
            {/* Precio destacado */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              padding: '1rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: 12,
                opacity: 0.8,
                marginBottom: '0.25rem'
              }}>
                Inversión por sesión
              </div>
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#fff'
              }}>
                $25.00 USD
              </div>
            </div>
          </div>

          {/* Detalles de la sesión */}
          <div style={{
            background: '#f8fafc',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '1.25rem'
          }}>
            <h4 style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#1e293b',
              margin: '0 0 0.75rem 0'
            }}>
              Detalles de tu sesión
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Clock size={16} color="#0057FF" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Duración</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>50 minutos</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Users size={16} color="#0057FF" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Modalidad</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Virtual</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Shield size={16} color="#0057FF" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Seguridad</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>100% Confidencial</div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={16} color="#0057FF" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Incluye</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Evaluación completa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Garantía de seguridad */}
          <div style={{
            background: '#f0fdf4',
            borderRadius: 8,
            padding: '0.75rem',
            marginBottom: '1.25rem',
            border: '1px solid #bbf7d0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Shield size={16} color="#16a34a" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>
                Pago 100% Seguro
              </div>
              <div style={{ fontSize: 12, color: '#15803d' }}>
                Encriptación SSL
              </div>
            </div>
          </div>

          {/* Botones de PayPal */}
          <div style={{
            marginBottom: '1.25rem'
          }}>
            <PayPalButtons
              style={{
                shape: "rect",
                layout: "vertical",
                color: "blue",
                label: "pay",
              }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
            />
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div style={{
              background: message.includes('exitoso') ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${message.includes('exitoso') ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: 8,
              padding: '0.75rem',
              marginBottom: '1.25rem',
              textAlign: 'center',
              fontSize: 14,
              color: message.includes('exitoso') ? '#15803d' : '#dc2626'
            }}>
              {message}
            </div>
          )}

          {/* Botón de cancelar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '2px solid #e5e7eb',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontSize: 14,
                fontWeight: 600,
                color: '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;





