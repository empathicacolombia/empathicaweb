import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX
} from 'lucide-react';
import PsychologistDetailsModal from './PsychologistDetailsModal';
import ConfirmationModal from './ConfirmationModal';

/**
 * Componente para gestionar psicólogos en el dashboard de super admin
 */
const PsychologistManagement = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Estados para las categorías
  const [activePsychologists, setActivePsychologists] = useState([]);
  const [inactivePsychologists, setInactivePsychologists] = useState([]);
  const [pendingApprovalPsychologists, setPendingApprovalPsychologists] = useState([]);
  const [pendingFormPsychologists, setPendingFormPsychologists] = useState([]);

  // Estados para el modal de detalles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPsychologistId, setSelectedPsychologistId] = useState(null);

  // Estados para el modal de confirmación
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null); // 'approve' o 'reject'
  const [confirmationPsychologist, setConfirmationPsychologist] = useState(null);
  const [confirmationLoading, setConfirmationLoading] = useState(false);

  /**
   * Carga todos los psicólogos desde el backend
   */
  const fetchPsychologists = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllPsychologists();
      
      // El backend devuelve { content: [...] }, necesitamos extraer el array
      const psychologistsList = response.content || response || [];
      
      console.log('Datos recibidos del backend:', response);
      console.log('Lista de psicólogos extraída:', psychologistsList);
      
      setPsychologists(psychologistsList);
      categorizePsychologists(psychologistsList);
    } catch (error) {
      console.error('Error cargando psicólogos:', error);
      setError('Error al cargar la lista de psicólogos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Categoriza los psicólogos por su userStatus
   */
  const categorizePsychologists = (psychologistsList) => {
    // Asegurar que psychologistsList sea un array
    if (!Array.isArray(psychologistsList)) {
      console.error('psychologistsList no es un array:', psychologistsList);
      setActivePsychologists([]);
      setInactivePsychologists([]);
      setPendingApprovalPsychologists([]);
      setPendingFormPsychologists([]);
      return;
    }

    const active = psychologistsList.filter(p => p.userStatus === 'ACTIVE');
    const inactive = psychologistsList.filter(p => p.userStatus === 'INACTIVE');
    const pendingApproval = psychologistsList.filter(p => p.userStatus === 'PENDING_APPROVAL');
    const pendingForm = psychologistsList.filter(p => p.userStatus === 'PENDING_FORM_FULFILLMENT');

    setActivePsychologists(active);
    setInactivePsychologists(inactive);
    setPendingApprovalPsychologists(pendingApproval);
    setPendingFormPsychologists(pendingForm);
  };

  /**
   * Filtra psicólogos por término de búsqueda
   */
  const filterPsychologists = (list) => {
    if (!searchTerm) return list;
    
    return list.filter(psychologist => 
      psychologist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  /**
   * Obtiene la lista de psicólogos según el filtro seleccionado
   */
  const getFilteredList = () => {
    let list = [];
    
    switch (selectedStatus) {
      case 'active':
        list = activePsychologists;
        break;
      case 'inactive':
        list = inactivePsychologists;
        break;
      case 'pending_approval':
        list = pendingApprovalPsychologists;
        break;
      case 'pending_form':
        list = pendingFormPsychologists;
        break;
      default:
        list = psychologists;
    }
    
    return filterPsychologists(list);
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
          icon: <Clock size={16} />,
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
          icon: <Users size={16} />,
          label: 'Desconocido'
        };
    }
  };

  /**
   * Obtiene las estadísticas de cada categoría
   */
  const getStats = () => ({
    total: psychologists.length,
    active: activePsychologists.length,
    inactive: inactivePsychologists.length,
    pendingApproval: pendingApprovalPsychologists.length,
    pendingForm: pendingFormPsychologists.length
  });

  /**
   * Abre el modal de detalles del psicólogo
   */
  const handleViewDetails = (psychologistId) => {
    setSelectedPsychologistId(psychologistId);
    setIsModalOpen(true);
  };

  /**
   * Cierra el modal de detalles
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPsychologistId(null);
  };

  /**
   * Abre el modal de confirmación para aprobar psicólogo
   */
  const handleApproveClick = (psychologist) => {
    setConfirmationAction('approve');
    setConfirmationPsychologist(psychologist);
    setIsConfirmationModalOpen(true);
  };

  /**
   * Abre el modal de confirmación para rechazar psicólogo
   */
  const handleRejectClick = (psychologist) => {
    setConfirmationAction('reject');
    setConfirmationPsychologist(psychologist);
    setIsConfirmationModalOpen(true);
  };

  /**
   * Cierra el modal de confirmación
   */
  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setConfirmationAction(null);
    setConfirmationPsychologist(null);
    setConfirmationLoading(false);
  };

  /**
   * Ejecuta la acción de aprobar o rechazar psicólogo
   */
  const handleConfirmAction = async () => {
    if (!confirmationPsychologist || !confirmationAction) return;

    try {
      setConfirmationLoading(true);
      
      const newStatus = confirmationAction === 'approve' ? 'ACTIVE' : 'INACTIVE';
      
      await userService.updatePsychologistStatus(confirmationPsychologist.userId, newStatus);
      
      // Actualizar la lista de psicólogos
      await fetchPsychologists();
      
      // Cerrar modal y mostrar mensaje de éxito
      handleCloseConfirmationModal();
      
      // Aquí podrías mostrar una notificación de éxito
      console.log(`Psicólogo ${confirmationAction === 'approve' ? 'aprobado' : 'rechazado'} exitosamente`);
      
    } catch (error) {
      console.error(`Error ${confirmationAction === 'approve' ? 'aprobando' : 'rechazando'} psicólogo:`, error);
      setConfirmationLoading(false);
      // Aquí podrías mostrar una notificación de error
    }
  };

  // Cargar psicólogos al montar el componente
  useEffect(() => {
    fetchPsychologists();
  }, []);

  const stats = getStats();
  const filteredList = getFilteredList();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 400 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #0057FF', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#6b7280' }}>Cargando psicólogos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
          onClick={fetchPsychologists}
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
    );
  }

  return (
    <div className="psychologist-management">
      {/* Header con estadísticas */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ 
          color: '#222', 
          fontWeight: 700, 
          fontSize: 24, 
          marginBottom: 16 
        }}>
          Gestión de Psicólogos
        </h2>
        
        {/* Estadísticas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 16,
          marginBottom: 24
        }}>
          <div style={{ 
            background: '#fff', 
            padding: 16, 
            borderRadius: 8, 
            border: '1px solid #e0e7ef',
            textAlign: 'center'
          }}>
            <div style={{ color: '#0057FF', fontWeight: 700, fontSize: 24 }}>{stats.total}</div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>Total</div>
          </div>
          <div style={{ 
            background: '#fff', 
            padding: 16, 
            borderRadius: 8, 
            border: '1px solid #e0e7ef',
            textAlign: 'center'
          }}>
            <div style={{ color: '#28a745', fontWeight: 700, fontSize: 24 }}>{stats.active}</div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>Activos</div>
          </div>
          <div style={{ 
            background: '#fff', 
            padding: 16, 
            borderRadius: 8, 
            border: '1px solid #e0e7ef',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ffc107', fontWeight: 700, fontSize: 24 }}>{stats.pendingApproval}</div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>Pendientes de Aprobación</div>
          </div>
          <div style={{ 
            background: '#fff', 
            padding: 16, 
            borderRadius: 8, 
            border: '1px solid #e0e7ef',
            textAlign: 'center'
          }}>
            <div style={{ color: '#fd7e14', fontWeight: 700, fontSize: 24 }}>{stats.pendingForm}</div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>Pendientes de Formulario</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Búsqueda */}
          <div style={{ position: 'relative', flex: 1, minWidth: 250 }}>
            <Search size={16} style={{ 
              position: 'absolute', 
              left: 12, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#6b7280' 
            }} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 14
              }}
            />
          </div>

          {/* Filtro por estado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color="#6b7280" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: 6,
                fontSize: 14,
                background: '#fff'
              }}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="pending_approval">Pendientes de Aprobación</option>
              <option value="pending_form">Pendientes de Formulario</option>
            </select>
          </div>

          {/* Botón de actualizar */}
          <button
            onClick={fetchPsychologists}
            style={{
              background: '#0057FF',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Users size={16} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Lista de psicólogos */}
      <div style={{ 
        background: '#fff', 
        borderRadius: 12, 
        padding: 24, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
      }}>
        <h3 style={{ 
          color: '#374151', 
          fontWeight: 600, 
          fontSize: 18, 
          marginBottom: 16 
        }}>
          Psicólogos ({filteredList.length})
        </h3>

        {filteredList.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: 40, 
            color: '#6b7280' 
          }}>
            <Users size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
            <p>No se encontraron psicólogos con los filtros aplicados.</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gap: 16 
          }}>
            {filteredList.map((psychologist) => {
              const statusInfo = getStatusInfo(psychologist.userStatus);
              
              return (
                <div key={psychologist.id} style={{ 
                  border: `1px solid ${statusInfo.borderColor}`, 
                  borderRadius: 8, 
                  padding: 16,
                  background: statusInfo.bgColor
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16
                  }}>
                    {/* Información del psicólogo */}
                    <div style={{ flex: 1, minWidth: 250 }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        marginBottom: 8 
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 6,
                          padding: '4px 8px',
                          background: '#fff',
                          borderRadius: 4,
                          border: `1px solid ${statusInfo.color}`
                        }}>
                          {statusInfo.icon}
                          <span style={{ 
                            color: statusInfo.color, 
                            fontSize: 12, 
                            fontWeight: 600 
                          }}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                      
                      <h4 style={{ 
                        color: '#222', 
                        fontWeight: 600, 
                        fontSize: 16, 
                        marginBottom: 4 
                      }}>
                        {psychologist.name} {psychologist.lastName}
                      </h4>
                      
                      <p style={{ 
                        color: '#6b7280', 
                        fontSize: 14, 
                        marginBottom: 4 
                      }}>
                        {psychologist.email}
                      </p>
                      
                      {psychologist.phoneNumber && (
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: 14 
                        }}>
                          📞 {psychologist.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Acciones */}
                    <div style={{ 
                      display: 'flex', 
                      gap: 8, 
                      flexWrap: 'wrap' 
                    }}>
                                             <button
                         onClick={() => handleViewDetails(psychologist.userId)}
                         style={{
                           background: '#0057FF',
                           color: '#fff',
                           border: 'none',
                           borderRadius: 6,
                           padding: '8px 12px',
                           cursor: 'pointer',
                           fontSize: 12,
                           display: 'flex',
                           alignItems: 'center',
                           gap: 6
                         }}
                       >
                         <Eye size={14} />
                         Ver Detalles
                       </button>

                                             {psychologist.userStatus === 'PENDING_APPROVAL' && (
                         <>
                           <button
                             onClick={() => handleApproveClick(psychologist)}
                             style={{
                               background: '#28a745',
                               color: '#fff',
                               border: 'none',
                               borderRadius: 6,
                               padding: '8px 12px',
                               cursor: 'pointer',
                               fontSize: 12,
                               display: 'flex',
                               alignItems: 'center',
                               gap: 6,
                               transition: 'background 0.2s ease'
                             }}
                             onMouseEnter={(e) => { e.currentTarget.style.background = '#218838'; }}
                             onMouseLeave={(e) => { e.currentTarget.style.background = '#28a745'; }}
                           >
                             <UserCheck size={14} />
                             Aprobar
                           </button>
                           <button
                             onClick={() => handleRejectClick(psychologist)}
                             style={{
                               background: '#dc3545',
                               color: '#fff',
                               border: 'none',
                               borderRadius: 6,
                               padding: '8px 12px',
                               cursor: 'pointer',
                               fontSize: 12,
                               display: 'flex',
                               alignItems: 'center',
                               gap: 6,
                               transition: 'background 0.2s ease'
                             }}
                             onMouseEnter={(e) => { e.currentTarget.style.background = '#c82333'; }}
                             onMouseLeave={(e) => { e.currentTarget.style.background = '#dc3545'; }}
                           >
                             <UserX size={14} />
                             Rechazar
                           </button>
                         </>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

             <style>
         {`
           @keyframes spin {
             0% { transform: rotate(0deg); }
             100% { transform: rotate(360deg); }
           }
         `}
       </style>

       {/* Modal de detalles del psicólogo */}
       <PsychologistDetailsModal
         isOpen={isModalOpen}
         onClose={handleCloseModal}
         psychologistId={selectedPsychologistId}
       />

       {/* Modal de confirmación */}
       <ConfirmationModal
         isOpen={isConfirmationModalOpen}
         onClose={handleCloseConfirmationModal}
         onConfirm={handleConfirmAction}
         title={
           confirmationAction === 'approve' 
             ? 'Aprobar Psicólogo' 
             : confirmationAction === 'reject' 
             ? 'Rechazar Psicólogo' 
             : 'Confirmar Acción'
         }
         message={
           confirmationAction === 'approve'
             ? `¿Estás seguro de que deseas aprobar a ${confirmationPsychologist?.name} ${confirmationPsychologist?.lastName}? Esta acción cambiará su estado a ACTIVO y podrá acceder a la plataforma.`
             : confirmationAction === 'reject'
             ? `¿Estás seguro de que deseas rechazar a ${confirmationPsychologist?.name} ${confirmationPsychologist?.lastName}? Esta acción cambiará su estado a INACTIVO y no podrá acceder a la plataforma.`
             : '¿Estás seguro de que deseas realizar esta acción?'
         }
         confirmText={
           confirmationAction === 'approve' 
             ? 'Sí, Aprobar' 
             : confirmationAction === 'reject' 
             ? 'Sí, Rechazar' 
             : 'Confirmar'
         }
         type={confirmationAction === 'approve' ? 'success' : 'danger'}
         loading={confirmationLoading}
       />
     </div>
   );
 };

export default PsychologistManagement;
