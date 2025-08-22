import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Clock,
  GraduationCap,
  FileText,
  Users,
  Heart,
  Brain,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle
} from 'lucide-react';

/**
 * Modal para mostrar los detalles completos de un psicólogo
 */
const PsychologistDetailsModal = ({ isOpen, onClose, psychologistId }) => {
  const [psychologist, setPsychologist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carga los detalles del psicólogo
   */
  const fetchPsychologistDetails = async () => {
    if (!psychologistId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getPsychologistDetails(psychologistId);
      setPsychologist(data);
    } catch (error) {
      console.error('Error cargando detalles del psicólogo:', error);
      setError('Error al cargar los detalles del psicólogo. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene el color y icono según el estado del usuario
   */
  const getStatusInfo = (status) => {
    switch (status) {
      case 'ACTIVE':
        return {
          color: '#28a745',
          bgColor: '#d4edda',
          borderColor: '#c3e6cb',
          icon: <CheckCircle size={16} />,
          label: 'Activo'
        };
      case 'INACTIVE':
        return {
          color: '#dc3545',
          bgColor: '#f8d7da',
          borderColor: '#f5c6cb',
          icon: <XCircle size={16} />,
          label: 'Inactivo'
        };
      case 'PENDING_APPROVAL':
        return {
          color: '#ffc107',
          bgColor: '#fff3cd',
          borderColor: '#ffeaa7',
          icon: <ClockIcon size={16} />,
          label: 'Pendiente de Aprobación'
        };
      case 'PENDING_FORM_FULFILLMENT':
        return {
          color: '#fd7e14',
          bgColor: '#ffe8d1',
          borderColor: '#ffd7a8',
          icon: <AlertCircle size={16} />,
          label: 'Pendiente de Formulario'
        };
      default:
        return {
          color: '#6c757d',
          bgColor: '#e2e3e5',
          borderColor: '#d6d8db',
          icon: <User size={16} />,
          label: 'Desconocido'
        };
    }
  };

  /**
   * Formatea la fecha de nacimiento
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  /**
   * Formatea el género
   */
  const formatGender = (gender) => {
    switch (gender) {
      case 'MALE': return 'Masculino';
      case 'FEMALE': return 'Femenino';
      case 'OTHER': return 'Otro';
      default: return gender || 'No especificado';
    }
  };

  /**
   * Formatea los horarios
   */
  const formatSchedule = (schedule) => {
    if (!schedule || typeof schedule !== 'object') {
      return 'No hay horarios configurados';
    }

    const days = {
      'MONDAY': 'Lunes',
      'TUESDAY': 'Martes',
      'WEDNESDAY': 'Miércoles',
      'THURSDAY': 'Jueves',
      'FRIDAY': 'Viernes',
      'SATURDAY': 'Sábado',
      'SUNDAY': 'Domingo'
    };

    const scheduleArray = [];
    Object.entries(schedule).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(slot => {
          if (slot.day && slot.startTime && slot.endTime) {
            scheduleArray.push({
              day: days[slot.day] || slot.day,
              startTime: slot.startTime,
              endTime: slot.endTime
            });
          }
        });
      }
    });

    if (scheduleArray.length === 0) {
      return 'No hay horarios configurados';
    }

    return scheduleArray.map((slot, index) => (
      <div key={index} style={{ 
        padding: '8px 12px', 
        background: '#f8f9fa', 
        borderRadius: 6, 
        marginBottom: 8,
        fontSize: 14
      }}>
        <strong>{slot.day}:</strong> {slot.startTime} - {slot.endTime}
      </div>
    ));
  };

  // Cargar detalles cuando se abre el modal
  useEffect(() => {
    if (isOpen && psychologistId) {
      fetchPsychologistDetails();
    }
  }, [isOpen, psychologistId]);

  if (!isOpen) return null;

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
        maxWidth: 800,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 0 24px',
          borderBottom: '1px solid #e0e7ef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: '#222',
            fontWeight: 700,
            fontSize: 24,
            margin: 0
          }}>
            Detalles del Psicólogo
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#6b7280',
              padding: 4
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{
                width: 40,
                height: 40,
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #0057FF',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }} />
              <p style={{ color: '#6b7280' }}>Cargando detalles...</p>
            </div>
          ) : error ? (
            <div style={{
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: 8,
              padding: 16,
              textAlign: 'center',
              color: '#c33'
            }}>
              <p>{error}</p>
              <button
                onClick={fetchPsychologistDetails}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  marginTop: 8
                }}
              >
                Reintentar
              </button>
            </div>
          ) : psychologist ? (
            <div style={{ display: 'grid', gap: 24 }}>
              {/* Información Personal */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 20
              }}>
                <h3 style={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <User size={20} />
                  Información Personal
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Nombre Completo</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0' }}>
                      {psychologist.name} {psychologist.lastName}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Email</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Mail size={16} />
                      {psychologist.email}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Teléfono</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Phone size={16} />
                      {psychologist.phoneNumber || 'No especificado'}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Fecha de Nacimiento</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Calendar size={16} />
                      {formatDate(psychologist.dateOfBirth)}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Género</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0' }}>
                      {formatGender(psychologist.gender)}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Zona Horaria</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Clock size={16} />
                      {psychologist.timezone || 'No especificada'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estado y Credenciales */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 20
              }}>
                <h3 style={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Award size={20} />
                  Estado y Credenciales
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Estado</label>
                    <div style={{ marginTop: 4 }}>
                      {(() => {
                        const statusInfo = getStatusInfo(psychologist.userStatus);
                        return (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 12px',
                            background: statusInfo.bgColor,
                            borderRadius: 6,
                            border: `1px solid ${statusInfo.borderColor}`
                          }}>
                            {statusInfo.icon}
                            <span style={{ color: statusInfo.color, fontSize: 14, fontWeight: 600 }}>
                              {statusInfo.label}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Cédula</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0' }}>
                      {psychologist.cedula || 'No especificada'}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Número de Licencia</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0' }}>
                      {psychologist.licenseNumber || 'No especificado'}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Especialidad</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0' }}>
                      {psychologist.specialty || 'No especificada'}
                    </p>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Descripción</label>
                    <p style={{ color: '#222', fontSize: 16, margin: '4px 0 0 0' }}>
                      {psychologist.oneLiner || 'No especificada'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información Profesional */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 20
              }}>
                <h3 style={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Brain size={20} />
                  Información Profesional
                </h3>
                
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Edades que Atiende</label>
                    <div style={{ marginTop: 4 }}>
                      {psychologist.attendAges && psychologist.attendAges.length > 0 ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {psychologist.attendAges.map((age, index) => (
                            <span key={index} style={{
                              background: '#0057FF',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: 4,
                              fontSize: 12
                            }}>
                              {age}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: '#6b7280', fontSize: 14 }}>No especificadas</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Estilo Terapéutico</label>
                    <div style={{ marginTop: 4 }}>
                      {psychologist.therapeuticStyle && psychologist.therapeuticStyle.length > 0 ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {psychologist.therapeuticStyle.map((style, index) => (
                            <span key={index} style={{
                              background: '#28a745',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: 4,
                              fontSize: 12
                            }}>
                              {style}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: '#6b7280', fontSize: 14 }}>No especificados</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>Modalidades Adicionales</label>
                    <div style={{ marginTop: 4 }}>
                      {psychologist.additionalModalities && psychologist.additionalModalities.length > 0 ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {psychologist.additionalModalities.map((modality, index) => (
                            <span key={index} style={{
                              background: '#fd7e14',
                              color: '#fff',
                              padding: '4px 8px',
                              borderRadius: 4,
                              fontSize: 12
                            }}>
                              {modality}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: '#6b7280', fontSize: 14 }}>No especificadas</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Historial Académico */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 20
              }}>
                <h3 style={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <GraduationCap size={20} />
                  Historial Académico
                </h3>
                
                {psychologist.academicHistory && psychologist.academicHistory.length > 0 ? (
                  <div style={{ display: 'grid', gap: 12 }}>
                    {psychologist.academicHistory.map((academic, index) => (
                      <div key={index} style={{
                        background: '#fff',
                        padding: 16,
                        borderRadius: 8,
                        border: '1px solid #e0e7ef'
                      }}>
                        <h4 style={{ color: '#222', fontWeight: 600, marginBottom: 8 }}>
                          {academic.degree} en {academic.major}
                        </h4>
                        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>
                          <strong>Institución:</strong> {academic.institution}
                        </p>
                        <p style={{ color: '#6b7280', fontSize: 14 }}>
                          <strong>Año de Graduación:</strong> {academic.graduationYear}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: 14 }}>No hay historial académico registrado</p>
                )}
              </div>

              {/* Horarios */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: 20
              }}>
                <h3 style={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <Clock size={20} />
                  Horarios de Atención
                </h3>
                
                <div>
                  {formatSchedule(psychologist.psychologistSchedule)}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PsychologistDetailsModal;
