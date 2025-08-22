import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

/**
 * Modal de confirmación para acciones de aprobación/rechazo
 */
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText, 
  cancelText = 'Cancelar',
  type = 'warning', // 'warning', 'success', 'danger'
  loading = false 
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle size={24} color="#28a745" />,
          bgColor: '#d4edda',
          borderColor: '#c3e6cb',
          textColor: '#155724'
        };
      case 'danger':
        return {
          icon: <XCircle size={24} color="#dc3545" />,
          bgColor: '#f8d7da',
          borderColor: '#f5c6cb',
          textColor: '#721c24'
        };
      default: // warning
        return {
          icon: <AlertTriangle size={24} color="#ffc107" />,
          bgColor: '#fff3cd',
          borderColor: '#ffeaa7',
          textColor: '#856404'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        maxWidth: 400,
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 0 24px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            {typeStyles.icon}
          </div>
          <h3 style={{
            color: '#222',
            fontWeight: 700,
            fontSize: 20,
            margin: 0,
            marginBottom: 8
          }}>
            {title}
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: 14,
            lineHeight: 1.5,
            margin: 0
          }}>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div style={{
          padding: '24px',
          display: 'flex',
          gap: 12,
          justifyContent: 'center'
        }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s ease',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#e5e7eb';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#f3f4f6';
              }
            }}
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              background: type === 'success' ? '#28a745' : type === 'danger' ? '#dc3545' : '#ffc107',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s ease',
              opacity: loading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = type === 'success' ? '#218838' : type === 'danger' ? '#c82333' : '#e0a800';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = type === 'success' ? '#28a745' : type === 'danger' ? '#dc3545' : '#ffc107';
              }
            }}
          >
            {loading && (
              <div style={{
                width: 16,
                height: 16,
                border: '2px solid transparent',
                borderTop: '2px solid #fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            )}
            {confirmText}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmationModal;
