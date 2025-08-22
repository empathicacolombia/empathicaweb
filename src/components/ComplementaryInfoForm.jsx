import React, { useState } from 'react';
import { userService } from '../services/api';

/**
 * Componente para el formulario de información complementaria del psicólogo
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario actual
 * @param {Function} props.onSubmitSuccess - Callback cuando se envía exitosamente
 * @returns {JSX.Element} - Formulario de información complementaria
 */
const ComplementaryInfoForm = ({ user, onSubmitSuccess }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    timezone: '',
    cedula: '',
    oneliner: '', // Corregido: el backend usa 'oneliner' no 'oneLiner'
    licenseNumber: '',
    specialty: '',
    attendAges: [],
    therapeuticStyle: [],
    additionalModalities: []
  });

  // Estado para el historial académico
  const [academicHistory, setAcademicHistory] = useState([
    {
      institution: '',
      degree: '',
      major: '',
      graduationYear: ''
    }
  ]);

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Opciones predefinidas
  const timezoneOptions = [
    { value: 'America/Mexico_City', label: 'México (GMT-6)' },
    { value: 'America/New_York', label: 'Nueva York, Estados Unidos (GMT-5)' },
    { value: 'America/Chicago', label: 'Chicago, Estados Unidos (GMT-6)' },
    { value: 'America/Denver', label: 'Denver, Estados Unidos (GMT-7)' },
    { value: 'America/Los_Angeles', label: 'Los Ángeles, Estados Unidos (GMT-8)' },
    { value: 'America/Toronto', label: 'Toronto, Canadá (GMT-5)' },
    { value: 'America/Vancouver', label: 'Vancouver, Canadá (GMT-8)' },
    { value: 'America/Bogota', label: 'Bogotá, Colombia (GMT-5)' },
    { value: 'America/Lima', label: 'Lima, Perú (GMT-5)' },
    { value: 'America/Santiago', label: 'Santiago, Chile (GMT-3)' },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires, Argentina (GMT-3)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo, Brasil (GMT-3)' },
    { value: 'America/Caracas', label: 'Caracas, Venezuela (GMT-4)' },
    { value: 'America/Guayaquil', label: 'Guayaquil, Ecuador (GMT-5)' },
    { value: 'America/Guatemala', label: 'Guatemala (GMT-6)' },
    { value: 'America/El_Salvador', label: 'El Salvador (GMT-6)' },
    { value: 'America/Tegucigalpa', label: 'Tegucigalpa, Honduras (GMT-6)' },
    { value: 'America/Managua', label: 'Managua, Nicaragua (GMT-6)' },
    { value: 'America/San_Jose', label: 'San José, Costa Rica (GMT-6)' },
    { value: 'America/Panama', label: 'Panamá (GMT-5)' }
  ];
  
  const ageOptions = ['Niños (0-12)', 'Adolescentes (13-17)', 'Adultos (18-64)', 'Adultos mayores (65+)'];
  const therapeuticStyleOptions = [
    'Terapia Cognitivo-Conductual (TCC)',
    'Psicoanálisis',
    'Terapia Humanista',
    'Terapia Sistémica',
    'Terapia Gestalt',
    'Terapia de Aceptación y Compromiso (ACT)',
    'Terapia Dialéctica Conductual (DBT)',
    'Terapia EMDR',
    'Terapia Narrativa',
    'Terapia Breve Centrada en Soluciones'
  ];
  const modalityOptions = [
    'Mindfulness',
    'Arte Terapia',
    'Musicoterapia',
    'Terapia de Juego',
    'Terapia Familiar',
    'Terapia de Pareja',
    'Terapia Grupal',
    'Evaluación Psicológica',
    'Intervención en Crisis'
  ];

  /**
   * Maneja cambios en campos de texto
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Maneja cambios en arrays (checkboxes)
   */
  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  /**
   * Maneja cambios en el historial académico
   */
  const handleAcademicHistoryChange = (index, field, value) => {
    setAcademicHistory(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  /**
   * Agrega un nuevo registro académico
   */
  const addAcademicRecord = () => {
    setAcademicHistory(prev => [...prev, {
      institution: '',
      degree: '',
      major: '',
      graduationYear: ''
    }]);
  };

  /**
   * Elimina un registro académico
   */
  const removeAcademicRecord = (index) => {
    setAcademicHistory(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Valida que todos los campos estén completos
   */
  const validateForm = () => {
    // Validar campos básicos
    const basicFields = ['timezone', 'cedula', 'oneliner', 'licenseNumber', 'specialty'];
    for (const field of basicFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return `El campo ${field} es obligatorio`;
      }
    }

    // Validar arrays
    const arrayFields = ['attendAges', 'therapeuticStyle', 'additionalModalities'];
    for (const field of arrayFields) {
      if (formData[field].length === 0) {
        return `Debe seleccionar al menos una opción en ${field}`;
      }
    }

    // Validar historial académico
    for (let i = 0; i < academicHistory.length; i++) {
      const record = academicHistory[i];
      const academicFields = ['institution', 'degree', 'major', 'graduationYear'];
      for (const field of academicFields) {
        if (!record[field] || record[field].trim() === '') {
          return `El campo ${field} es obligatorio en el registro académico ${i + 1}`;
        }
      }
    }

    return null;
  };

  /**
   * Prepara y solicita confirmación para enviar el formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Preparar los datos para enviar
    const dataToSend = {
      ...formData,
      userStatus: 'PENDING_APPROVAL', // Forzar el cambio de estado
      academicHistory: academicHistory.map(record => ({
        ...record,
        academicHistoryId: 0 // El backend asignará el ID
      }))
    };

    // Llamar a la función de confirmación en lugar de enviar directamente
    if (onSubmitSuccess) {
      onSubmitSuccess(dataToSend);
    }
  };

  return (
    <div style={{ 
      background: '#fff', 
      borderRadius: 12, 
      padding: 24, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginTop: 24
    }}>
      <h3 style={{ 
        color: '#222', 
        fontWeight: 700, 
        fontSize: 20, 
        marginBottom: 24,
        borderBottom: '2px solid #e0e7ef',
        paddingBottom: 12
      }}>
        Formulario de Información Complementaria
      </h3>

      {error && (
        <div style={{ 
          background: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: 8, 
          padding: 12, 
          marginBottom: 20,
          color: '#c33'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campos básicos */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ color: '#444', fontWeight: 600, marginBottom: 16 }}>Información Básica</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Zona Horaria *
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14,
                  background: '#fff'
                }}
              >
                <option value="">Selecciona tu zona horaria</option>
                {timezoneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Cédula Profesional *
              </label>
              <input
                type="text"
                value={formData.cedula}
                onChange={(e) => handleInputChange('cedula', e.target.value)}
                placeholder="Número de cédula profesional"
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14
                }}
              />
            </div>

                         <div>
               <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                 Descripción Breve *
               </label>
               <input
                 type="text"
                 value={formData.oneliner}
                 onChange={(e) => handleInputChange('oneliner', e.target.value)}
                 placeholder="Una breve descripción de tu enfoque"
                 style={{
                   width: '100%',
                   padding: 12,
                   border: '1px solid #ddd',
                   borderRadius: 8,
                   fontSize: 14
                 }}
               />
             </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Número de Licencia *
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                placeholder="Número de licencia"
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Especialidad *
              </label>
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                placeholder="Tu área de especialización"
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14
                }}
              />
            </div>
          </div>
        </div>

        {/* Edades que atiende */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ color: '#444', fontWeight: 600, marginBottom: 16 }}>Edades que Atiendes *</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {ageOptions.map(age => (
              <label key={age} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={formData.attendAges.includes(age)}
                  onChange={(e) => handleArrayChange('attendAges', age, e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: 14 }}>{age}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Estilos terapéuticos */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ color: '#444', fontWeight: 600, marginBottom: 16 }}>Estilos Terapéuticos *</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
            {therapeuticStyleOptions.map(style => (
              <label key={style} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={formData.therapeuticStyle.includes(style)}
                  onChange={(e) => handleArrayChange('therapeuticStyle', style, e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: 14 }}>{style}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modalidades adicionales */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ color: '#444', fontWeight: 600, marginBottom: 16 }}>Modalidades Adicionales *</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {modalityOptions.map(modality => (
              <label key={modality} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={formData.additionalModalities.includes(modality)}
                  onChange={(e) => handleArrayChange('additionalModalities', modality, e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: 14 }}>{modality}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Historial Académico */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h4 style={{ color: '#444', fontWeight: 600, margin: 0 }}>Historial Académico *</h4>
            <button
              type="button"
              onClick={addAcademicRecord}
              style={{
                background: '#0057ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              + Agregar Registro
            </button>
          </div>

          {academicHistory.map((record, index) => (
            <div key={index} style={{ 
              border: '1px solid #e0e7ef', 
              borderRadius: 8, 
              padding: 16, 
              marginBottom: 16,
              background: '#f8f9fa'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h5 style={{ color: '#555', margin: 0 }}>Registro {index + 1}</h5>
                {academicHistory.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAcademicRecord(index)}
                    style={{
                      background: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 8px',
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#666' }}>
                    Institución *
                  </label>
                  <input
                    type="text"
                    value={record.institution}
                    onChange={(e) => handleAcademicHistoryChange(index, 'institution', e.target.value)}
                    placeholder="Nombre de la institución"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#666' }}>
                    Grado *
                  </label>
                  <input
                    type="text"
                    value={record.degree}
                    onChange={(e) => handleAcademicHistoryChange(index, 'degree', e.target.value)}
                    placeholder="Ej: Licenciatura, Maestría, Doctorado"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#666' }}>
                    Especialidad *
                  </label>
                  <input
                    type="text"
                    value={record.major}
                    onChange={(e) => handleAcademicHistoryChange(index, 'major', e.target.value)}
                    placeholder="Especialidad o carrera"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: '#666' }}>
                    Año de Graduación *
                  </label>
                  <input
                    type="text"
                    value={record.graduationYear}
                    onChange={(e) => handleAcademicHistoryChange(index, 'graduationYear', e.target.value)}
                    placeholder="Ej: 2020"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de envío */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#ccc' : '#0057ff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '16px 32px',
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              minWidth: 200
            }}
          >
            {loading ? 'Guardando...' : 'Guardar Información Complementaria'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplementaryInfoForm;
