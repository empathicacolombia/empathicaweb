import React, { useState } from 'react';

const PsychologistProfileForm = ({ navigationProps }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    genero: '',
    cedula: '',
    hojaVida: null,
    fotoProfesional: null,
    oneLiner: '',
    descripcionProfesional: '',
    enfoquesTerapeuticos: '',
    areasEspecializacion: '',
    edadesAtiende: [],
    estiloGuia: '',
    autoRevelacion: '',
    enfoqueTareas: '',
    modalidadesAdicionales: [],
    otrosModalidades: ''
  });

  const [fileNames, setFileNames] = useState({
    hojaVida: 'Sin archivos seleccionados',
    fotoProfesional: 'Sin archivos seleccionados',
    videoPresentacion: 'Sin archivos seleccionados'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }));
      setFileNames(prev => ({
        ...prev,
        [field]: file.name
      }));
    }
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Psychologist profile form submitted:', formData);
    // Navegar al dashboard del psicólogo
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('psychologist-dashboard');
    }
  };

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  return (
    <div className="section-container psychologist-profile-form" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f8ff 0%, #fff 100%)',
      padding: '2rem 0'
    }}>
      {/* Header */}
      <nav className="navbar-container" style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1.2rem 0', 
        marginBottom: '2rem'
      }}>
        <div className="container" style={{ 
          maxWidth: 1300, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          <span 
            className="navbar-logo"
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              letterSpacing: 1,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onClick={() => handleNavigation('individuals')}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Empathica
          </span>
          <ul className="navbar-links" style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0, 
            fontSize: 18, 
            fontWeight: 500 
          }}>
            <li>
              <button
                onClick={() => handleNavigation('psychologists')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                Psicólogos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('business')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                Empresas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('about-us')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                Acerca de
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('pricing')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                Precios
              </button>
            </li>
          </ul>
          <div className="navbar-buttons" style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className="btn-secondary"
              onClick={() => handleNavigation('login')}
              style={{
                background: '#fff',
                color: '#0057FF',
                border: 'none',
                borderRadius: 20,
                padding: '0.7rem 1.5rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Iniciar sesión
            </button>
            <button 
              className="btn-primary"
              onClick={() => handleNavigation('register')}
              style={{
                background: '#0057FF',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: 20,
                padding: '0.7rem 1.5rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#0057FF';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0057FF';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Registrarse
            </button>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="container form-container" style={{
        maxWidth: 800,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px #0057ff11',
        padding: '3rem 2.5rem'
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="section-title" style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#0057FF',
            margin: '0 0 0.5rem 0'
          }}>
            Completar Perfil de Psicólogo
          </h1>
          <p className="section-subtitle" style={{
            color: '#666',
            fontSize: 18,
            margin: 0
          }}>
            Completa tu información profesional para unirte a Empathica
          </p>
        </div>

        <form onSubmit={e => { e.preventDefault(); if (navigationProps && navigationProps.onNavigate) { navigationProps.onNavigate('psychologist-dashboard'); } }}>
          {/* Información Personal Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#f8f9fa',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>📁</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Información Personal
              </h3>
            </div>
            
            <div className="cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Nombre*
                </label>
                <input
                  className="form-input"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16
                  }}
                />
              </div>
              
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Apellido*
                </label>
                <input
                  className="form-input"
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => handleInputChange('apellido', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16
                  }}
                />
              </div>
              
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Email*
                </label>
                <input
                  className="form-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16
                  }}
                />
              </div>
              
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Número de teléfono*
                </label>
                <input
                  className="form-input"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16
                  }}
                />
              </div>
              
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Género*
                </label>
                <select
                  className="form-input"
                  value={formData.genero}
                  onChange={(e) => handleInputChange('genero', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16,
                    background: '#fff'
                  }}
                >
                  <option value="">Selecciona tu género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Cédula / ID profesional*
                </label>
                <input
                  className="form-input"
                  type="text"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange('cedula', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 16
                  }}
                />
              </div>
            </div>
          </div>

          {/* Documentos Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#f8f9fa',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Documentos
              </h3>
            </div>
            
            <div className="cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Hoja de vida (PDF)
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange('hojaVida', e)}
                    style={{ display: 'none' }}
                    id="hojaVida"
                  />
                  <label
                    htmlFor="hojaVida"
                    style={{
                      background: '#0057FF',
                      color: '#fff',
                      padding: '0.75rem 1.5rem',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 14
                    }}
                  >
                    Seleccionar archivo
                  </label>
                  <span style={{
                    color: '#666',
                    fontSize: 14
                  }}>
                    {fileNames.hojaVida}
                  </span>
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Foto profesional (JPG, PNG)
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('fotoProfesional', e)}
                    style={{ display: 'none' }}
                    id="fotoProfesional"
                  />
                  <label
                    htmlFor="fotoProfesional"
                    style={{
                      background: '#0057FF',
                      color: '#fff',
                      padding: '0.75rem 1.5rem',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 14
                    }}
                  >
                    Seleccionar archivo
                  </label>
                  <span style={{
                    color: '#666',
                    fontSize: 14
                  }}>
                    {fileNames.fotoProfesional}
                  </span>
                </div>
              </div>
            </div>

            {/* Video de presentación */}
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#333'
              }}>
                Video de presentación (MP4, MOV, AVI) - Máximo 1 minuto* (Máximo 25 MB)
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <input
                  type="file"
                  accept=".mp4,.mov,.avi"
                  onChange={(e) => handleFileChange('videoPresentacion', e)}
                  style={{ display: 'none' }}
                  id="videoPresentacion"
                />
                <label
                  htmlFor="videoPresentacion"
                  style={{
                    background: '#0057FF',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  Seleccionar archivo
                </label>
                <span style={{
                  color: '#666',
                  fontSize: 14
                }}>
                  {fileNames.videoPresentacion}
                </span>
              </div>
              <div style={{
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: 8,
                padding: '1rem',
                marginTop: '1rem'
              }}>
                <strong>Importante:</strong> Graba un video de máximo 1 minuto donde te presentes, expliques quién eres y cómo puedes ayudar a los pacientes. Este video ayudará a generar confianza y empatía.
              </div>
            </div>
          </div>

          {/* Información Profesional Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#fff3cd',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>💼</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Información Profesional
              </h3>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#333'
              }}>
                One-liner profesional*
              </label>
              <input
                type="text"
                value={formData.oneLiner}
                onChange={(e) => handleInputChange('oneLiner', e.target.value)}
                placeholder="Ej: Te acompaño a construir una vida con sentido"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 16
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#333'
              }}>
                Descripción profesional*
              </label>
              <textarea
                value={formData.descripcionProfesional}
                onChange={(e) => handleInputChange('descripcionProfesional', e.target.value)}
                placeholder="Describe tu enfoque terapéutico, experiencia y qué te hace único como profesional..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 16,
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Enfoques Terapéuticos Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#e3f2fd',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>🧠</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Enfoques terapéuticos*
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              {['TCC', 'Psicodinamica', 'Gestalt', 'DBT', 'Humanistica', 'Sistemica', 'ACT', 'EMDR'].map((enfoque) => (
                <label key={enfoque} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 6
                }}>
                  <input
                    type="radio"
                    name="enfoquesTerapeuticos"
                    value={enfoque}
                    checked={formData.enfoquesTerapeuticos === enfoque}
                    onChange={(e) => handleRadioChange('enfoquesTerapeuticos', e.target.value)}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontSize: 14 }}>{enfoque}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Áreas de Especialización Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#f3e5f5',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Áreas de Especialización y Problemas Comunes*
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              {['Ansiedad', 'Conflicto de pareja', 'Trauma', 'Familia', 'Depresión', 'Duelo', 'Adolescencia', 'Adicciones'].map((area) => (
                <label key={area} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 6
                }}>
                  <input
                    type="radio"
                    name="areasEspecializacion"
                    value={area}
                    checked={formData.areasEspecializacion === area}
                    onChange={(e) => handleRadioChange('areasEspecializacion', e.target.value)}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontSize: 14 }}>{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Edades que Atiende Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#e8f5e8',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>👥</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Edades que atiende *
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              {['Niños', 'AdultosJovenes', 'AdultosMayores', 'Adolescentes', 'Adultos'].map((edad) => (
                <label key={edad} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 6
                }}>
                  <input
                    type="checkbox"
                    value={edad}
                    checked={formData.edadesAtiende.includes(edad)}
                    onChange={(e) => handleCheckboxChange('edadesAtiende', e.target.value)}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontSize: 14 }}>{edad}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estilo Terapéutico Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#fff3e0',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>🧠</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Estilo Terapéutico
              </h3>
            </div>
            
            {/* Estilo de Guía */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: 16 }}>Estilo de Guía en Terapia *</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: 14 }}>How do you guide therapy sessions?</p>
              {[
                { value: 'muyDirectivo', label: 'Muy Directivo: Suelo dar tareas claras y guiar activamente el proceso.' },
                { value: 'colaborativo', label: 'Colaborativo: Ofrezco ideas y apoyo al paciente para que encuentre sus propias soluciones.' },
                { value: 'principalmenteEscucha', label: 'Principalmente Escucha: Mi rol es más de escucha activa y reflexión, permitiendo que el paciente explore libremente.' }
              ].map((option) => (
                <label key={option.value} style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0',
                  background: formData.estiloGuia === option.value ? '#f0f8ff' : '#fff'
                }}>
                  <input
                    type="radio"
                    name="estiloGuia"
                    value={option.value}
                    checked={formData.estiloGuia === option.value}
                    onChange={(e) => handleRadioChange('estiloGuia', e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: 14 }}>{option.label}</span>
                </label>
              ))}
            </div>

            {/* Auto-revelación */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: 16 }}>Disposición a la Auto-revelación (del terapeuta) *</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: 14 }}>How willing are you to self-disclose during therapy?</p>
              {[
                { value: 'nunca', label: 'Nunca o casi nunca: Mantengo una distancia profesional estricta.' },
                { value: 'muyOcasionalmente', label: 'Muy ocasionalmente: Solo si es estrictamente necesario y muy breve.' },
                { value: 'ocasionalmente', label: 'Ocasionalmente: Si veo que ayuda a la conexión o a ilustrar un punto.' },
                { value: 'siEsTerapeutico', label: 'Si es terapéutico, lo hago: Estoy abierto(a) a compartir para fomentar la conexión.' }
              ].map((option) => (
                <label key={option.value} style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0',
                  background: formData.autoRevelacion === option.value ? '#f0f8ff' : '#fff'
                }}>
                  <input
                    type="radio"
                    name="autoRevelacion"
                    value={option.value}
                    checked={formData.autoRevelacion === option.value}
                    onChange={(e) => handleRadioChange('autoRevelacion', e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: 14 }}>{option.label}</span>
                </label>
              ))}
            </div>

            {/* Enfoque en Tareas */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: 16 }}>Enfoque en Tareas entre Sesiones *</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: 14 }}>What is your approach to tasks or homework between sessions?</p>
              {[
                { value: 'nadaImportante', label: 'Nada importante: El trabajo es principalmente en sesión.' },
                { value: 'pocoImportante', label: 'Poco importante: Las sugiero ocasionalmente, si el paciente lo desea.' },
                { value: 'importante', label: 'Importante: Son una parte valiosa del proceso para el avance.' },
                { value: 'fundamental', label: 'Fundamental: Las tareas son esenciales para el progreso y la aplicación de lo aprendido.' }
              ].map((option) => (
                <label key={option.value} style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.75rem',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0',
                  background: formData.enfoqueTareas === option.value ? '#f0f8ff' : '#fff'
                }}>
                  <input
                    type="radio"
                    name="enfoqueTareas"
                    value={option.value}
                    checked={formData.enfoqueTareas === option.value}
                    onChange={(e) => handleRadioChange('enfoqueTareas', e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: 14 }}>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modalidades Terapéuticas Adicionales Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              background: '#fff3e0',
              padding: '1rem 1.5rem',
              borderRadius: 12,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: 20 }}>⭐</span>
              <h3 style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: '#333'
              }}>
                Modalidades Terapéuticas Adicionales
              </h3>
            </div>
            <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: 14 }}>Fuera de lo tradicional (opcional)</p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: 16 }}>Modalidades adicionales</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                {['Arteterapia', 'Ecoterapia', 'Tecnicas de relajacion', 'Musicoterapia', 'Mindfulness', 'Enfoques basados en el juego'].map((modalidad) => (
                  <label key={modalidad} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: 6
                  }}>
                    <input
                      type="checkbox"
                      value={modalidad}
                      checked={formData.modalidadesAdicionales && formData.modalidadesAdicionales.includes(modalidad)}
                      onChange={(e) => handleCheckboxChange('modalidadesAdicionales', e.target.value)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ fontSize: 14 }}>{modalidad}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: 16 }}>Otros (especificar hasta 100 caracteres)</h4>
              <input
                type="text"
                value={formData.otrosModalidades || ''}
                onChange={(e) => handleInputChange('otrosModalidades', e.target.value)}
                placeholder="Ej: Terapia con mascotas, Hipnoterapia..."
                maxLength={100}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 16
                }}
              />
              <div style={{
                textAlign: 'right',
                marginTop: '0.5rem',
                color: '#666',
                fontSize: 12
              }}>
                {(formData.otrosModalidades || '').length}/100 caracteres
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{
                background: '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '1rem 3rem',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0057ff22',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <span style={{ fontSize: 20 }}>🚀</span>
              Registrar Psicólogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PsychologistProfileForm; 