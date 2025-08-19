import React from 'react';

/**
 * Componente para mostrar el estado de aprobación del psicólogo
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userStatus - Estado del usuario (ACTIVE, PENDING_APPROVAL, PENDING_FORM_FULFILLMENT)
 * @param {boolean} props.hasComplementaryInfo - Si tiene información complementaria
 * @param {Function} props.onShowForm - Callback para mostrar el formulario
 * @param {boolean} props.formSubmitted - Si el formulario fue enviado exitosamente
 * @returns {JSX.Element} - Componente de estado de aprobación
 */
const ApprovalStatus = ({ userStatus, hasComplementaryInfo, onShowForm, formSubmitted }) => {
  const getStatusInfo = () => {
    switch (userStatus) {
      case 'ACTIVE':
        return {
          title: '✅ Cuenta Aprobada',
          message: 'Tu cuenta ha sido aprobada por el administrador. Ya puedes acceder a todas las funcionalidades del dashboard.',
          color: '#28a745',
          background: '#d4edda',
          border: '#c3e6cb',
          showForm: false
        };
      
      case 'PENDING_FORM_FULFILLMENT':
        return {
          title: '📋 Información Pendiente',
          message: 'Debes completar tu información complementaria antes de poder acceder al dashboard completo.',
          color: '#dc3545',
          background: '#f8d7da',
          border: '#f5c6cb',
          showForm: true
        };
      
      case 'PENDING_APPROVAL':
        return {
          title: '⏳ Se está validando su información',
          message: 'Por favor espere. Su información complementaria ha sido enviada exitosamente y está siendo revisada por nuestro equipo administrativo. Una vez aprobada, podrá acceder a todas las funcionalidades del dashboard.',
          color: '#ffc107',
          background: '#fff3cd',
          border: '#ffeaa7',
          showForm: false
        };
      
      default:
        return {
          title: '❓ Estado Desconocido',
          message: 'No se pudo determinar el estado de tu cuenta. Contacta al administrador.',
          color: '#6c757d',
          background: '#e2e3e5',
          border: '#d6d8db',
          showForm: false
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div style={{
      background: statusInfo.background,
      border: `1px solid ${statusInfo.border}`,
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      textAlign: 'center'
    }}>
      <h3 style={{
        color: statusInfo.color,
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 16
      }}>
        {statusInfo.title}
      </h3>
      
      <p style={{
        color: '#495057',
        fontSize: 16,
        lineHeight: 1.5,
        marginBottom: 20
      }}>
        {statusInfo.message}
      </p>

             {/* Mostrar botón solo si está en PENDING_FORM_FULFILLMENT y no se ha enviado el formulario */}
       {userStatus === 'PENDING_FORM_FULFILLMENT' && !formSubmitted && (
         <button
           onClick={onShowForm}
           style={{
             background: statusInfo.color,
             color: '#fff',
             border: 'none',
             borderRadius: 8,
             padding: '12px 24px',
             fontSize: 16,
             fontWeight: 600,
             cursor: 'pointer',
             minWidth: 200
           }}
         >
           Completar Información Complementaria
         </button>
       )}
       
               {/* Mostrar mensaje de confirmación cuando está en PENDING_APPROVAL */}
        {userStatus === 'PENDING_APPROVAL' && (
          <div style={{
            background: '#e8f5e8',
            border: '1px solid #4caf50',
            borderRadius: 8,
            padding: '12px 24px',
            marginTop: 16,
            textAlign: 'center'
          }}>
            <span style={{ color: '#2e7d32', fontSize: 16, fontWeight: 600 }}>
              ✅ Información Enviada Exitosamente - En Proceso de Validación
            </span>
          </div>
        )}

             {/* Información adicional según el estado */}
       {userStatus === 'PENDING_FORM_FULFILLMENT' && (
         <div style={{
           background: '#fff',
           borderRadius: 8,
           padding: 16,
           marginTop: 16,
           border: '1px solid #dee2e6'
         }}>
           <h4 style={{ color: '#495057', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
             Información requerida:
           </h4>
           <ul style={{ 
             textAlign: 'left', 
             color: '#6c757d', 
             fontSize: 14, 
             lineHeight: 1.4,
             margin: 0,
             paddingLeft: 20
           }}>
             <li>Información profesional (cédula, licencia, especialidad)</li>
             <li>Edades que atiendes y estilos terapéuticos</li>
             <li>Modalidades adicionales de trabajo</li>
             <li>Historial académico completo</li>
           </ul>
         </div>
       )}

               {userStatus === 'PENDING_APPROVAL' && (
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 16,
            marginTop: 16,
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ color: '#495057', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              Proceso de validación:
            </h4>
            <ul style={{ 
              textAlign: 'left', 
              color: '#6c757d', 
              fontSize: 14, 
              lineHeight: 1.4,
              margin: 0,
              paddingLeft: 20
            }}>
              <li>✅ Tu información ha sido recibida correctamente</li>
              <li>🔍 Nuestro equipo validará tus credenciales profesionales</li>
              <li>📋 Se verificará la información académica proporcionada</li>
              <li>⏰ El proceso de validación puede tomar de 24 a 48 horas</li>
              <li>📧 Recibirás una notificación cuando tu cuenta sea aprobada</li>
            </ul>
          </div>
        )}
    </div>
  );
};

export default ApprovalStatus;
