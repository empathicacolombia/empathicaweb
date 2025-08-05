import React, { useState } from 'react';

const QuestionnaireMatch = ({ navigationProps }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [answers, setAnswers] = useState({
    section1: null,
    section2: {
      question2: null,
      question3: null,
      question4: null
    },
    section3: {
      question5: null,
      question6: null,
      question7: null
    },
    section4: {
      question8: null,
      question9: [],
      question10: [],
      question11: null
    },
    section5: {
      question12: null,
      question13: ''
    }
  });

  const handleOptionSelect = (section, question, option) => {
    setAnswers(prev => ({
      ...prev,
      [section]: section === 'section1' ? option : {
        ...prev[section],
        [question]: option
      }
    }));
  };

  const handleMultipleSelect = (section, question, optionId) => {
    setAnswers(prev => {
      const currentSelections = prev[section][question] || [];
      const isSelected = currentSelections.includes(optionId);
      
      let newSelections;
      if (isSelected) {
        // Remover si ya está seleccionado
        newSelections = currentSelections.filter(id => id !== optionId);
      } else {
        // Agregar si no está seleccionado
        if (question === 'question10' && currentSelections.length >= 3) {
          // Máximo 3 selecciones para pregunta 10
          return prev;
        }
        newSelections = [...currentSelections, optionId];
      }
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [question]: newSelections
        }
      };
    });
  };

  const handleNext = () => {
    if (currentSection === 1 && answers.section1) {
      setCurrentSection(2);
    } else if (currentSection === 2 && answers.section2.question2 && answers.section2.question3 && answers.section2.question4) {
      setCurrentSection(3);
    } else if (currentSection === 3 && answers.section3.question5 && answers.section3.question6 && answers.section3.question7) {
      setCurrentSection(4);
    } else if (currentSection === 4 && answers.section4.question8 && answers.section4.question9.length > 0 && answers.section4.question10.length > 0 && answers.section4.question11) {
      setCurrentSection(5);
    } else if (currentSection === 5 && answers.section5.question12) {
      // Terminar cuestionario
      if (navigationProps && navigationProps.onNavigate) {
        // Determinar si viene del dashboard o del landing
        const isFromDashboard = navigationProps.location && navigationProps.location.pathname && 
                               (navigationProps.location.pathname.includes('dashboard') || 
                                navigationProps.location.pathname.includes('client-'));
        
        navigationProps.onNavigate('test-results', { 
          testAnswers: answers,
          fromDashboard: isFromDashboard
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  const section1Options = [
    {
      id: 'A',
      icon: '☁️',
      title: 'Una nube gris sobre mi cabeza',
      desc: 'Me siento triste, desmotivado(a) o con falta de energía',
      color: '#f5f5f5',
      border: '#e0e0e0'
    },
    {
      id: 'B',
      icon: '📈',
      title: 'Una montaña rusa',
      desc: 'Mis emociones son un vaivén, me siento ansioso(a) o estresado(a) a menudo',
      color: '#fffbe6',
      border: '#ffe082'
    },
    {
      id: 'C',
      icon: '🧩',
      title: 'Un nudo en el cerebro',
      desc: 'Tengo problemas para tomar decisiones, entender mis pensamientos o concentrarme',
      color: '#f3eaff',
      border: '#d1b3ff'
    },
    {
      id: 'D',
      icon: '🌀',
      title: 'Un laberinto',
      desc: 'Me siento perdido(a), no sé qué dirección tomar en mi vida o en mis relaciones',
      color: '#e3f2fd',
      border: '#90caf9'
    },
    {
      id: 'E',
      icon: '🔒',
      title: 'Un candado',
      desc: 'Hay algo del pasado que me pesa y no puedo soltar',
      color: '#ffeaea',
      border: '#ffb3b3'
    }
  ];

  const section2Questions = {
    question2: {
      title: '¿Qué te gustaría sentir al terminar una sesión?',
      description: 'Después de hablar con tu psicólogo, ¿cuál de estas sensaciones te gustaría experimentar más a menudo?',
      options: [
        { id: 'A', icon: '😌', title: 'Tranquilidad', desc: 'Sentir paz y calma interior', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'B', icon: '💡', title: 'Claridad', desc: 'Tener las ideas más claras y ordenadas', color: '#e3f2fd', border: '#90caf9' },
        { id: 'C', icon: '✨', title: 'Esperanza', desc: 'Sentir que hay luz al final del túnel', color: '#fff3e0', border: '#ffcc80' },
        { id: 'D', icon: '🦁', title: 'Fuerza/Valentía', desc: 'Sentir que puedo enfrentar mis desafíos', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'E', icon: '🤗', title: 'Entendido(a)', desc: 'Sentir que alguien realmente me comprende', color: '#e0f2f1', border: '#80cbc4' }
      ]
    },
    question3: {
      title: '¿Cómo te imaginas el "ambiente" de tus sesiones?',
      description: '¿Cuál de estas imágenes representa mejor el tipo de espacio o sensación que te gustaría tener en tu terapia?',
      options: [
        { id: 'A', icon: '☕', title: 'Un café acogedor', desc: 'Ambiente cálido y conversacional', color: '#fff3e0', border: '#ffcc80' },
        { id: 'B', icon: '📚', title: 'Una biblioteca tranquila', desc: 'Espacio sereno para reflexionar', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'C', icon: '🎨', title: 'Un taller de arte', desc: 'Lugar creativo y dinámico', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'D', icon: '🌿', title: 'Un sendero en la naturaleza', desc: 'Espacio abierto y fresco', color: '#e0f2f1', border: '#80cbc4' }
      ]
    },
    question4: {
      title: '¿Qué tan importante es para ti que tu psicólogo sea de un género específico?',
      description: 'En una escala del 1 al 5, ¿qué tan importante es para ti que tu psicólogo sea hombre o mujer, o te da igual?',
      options: [
        { id: '1', icon: '👨', title: 'Prefiero que sea Hombre', desc: 'Es muy importante para mí', color: '#e3f2fd', border: '#90caf9' },
        { id: '2', icon: '👨', title: 'Me inclino más por Hombre', desc: 'Tengo una ligera preferencia', color: '#e8f5e8', border: '#b2f2d7' },
        { id: '3', icon: '⚖️', title: 'Me da igual', desc: 'No tengo preferencia', color: '#f5f5f5', border: '#e0e0e0' },
        { id: '4', icon: '👩', title: 'Me inclino más por Mujer', desc: 'Tengo una ligera preferencia', color: '#f3e5f5', border: '#ce93d8' },
        { id: '5', icon: '👩', title: 'Prefiero que sea Mujer', desc: 'Es muy importante para mí', color: '#ffeaea', border: '#ffb3b3' }
      ]
    }
  };

  const section3Questions = {
    question5: {
      title: '¿Cómo te gusta que te guíen?',
      description: 'Imagina que estás aprendiendo algo nuevo. ¿Cómo prefieres que sea la persona que te enseña o te ayuda?',
      options: [
        { id: 'A', icon: '🎯', title: 'Muy Directo', desc: 'Que me dé instrucciones claras y específicas', color: '#ffeaea', border: '#ffb3b3' },
        { id: 'B', icon: '⚖️', title: 'Equilibrado', desc: 'Que combine guía con espacio para que yo decida', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'C', icon: '👂', title: 'Solo Escucha', desc: 'Que me acompañe mientras yo encuentro mi camino', color: '#e3f2fd', border: '#90caf9' }
      ]
    },
    question6: {
      title: '¿Qué tan cómodo(a) te sientes al hablar de tus emociones más profundas?',
      description: '¿Qué tan fácil te resulta compartir tus sentimientos y pensamientos más íntimos con alguien nuevo?',
      options: [
        { id: 'A', icon: '🙁', title: 'Muy difícil / Algo difícil', desc: 'Me cuesta mucho trabajo abrirme', color: '#ffeaea', border: '#ffb3b3' },
        { id: 'B', icon: '😐', title: 'Neutral', desc: 'Depende del momento y la persona', color: '#f5f5f5', border: '#e0e0e0' },
        { id: 'C', icon: '😄', title: 'Algo fácil / Muy fácil', desc: 'Me resulta natural compartir mis sentimientos', color: '#e8f5e8', border: '#b2f2d7' }
      ]
    },
    question7: {
      title: '¿Qué harías si no estás de acuerdo con tu psicólogo?',
      description: 'Imagina que tu psicólogo te da una tarea o una idea con la que no estás de acuerdo. ¿Qué harías?',
      options: [
        { id: 'A', icon: '✅', title: 'Lo hago igual, aunque no esté muy convencido(a)', desc: 'Confío en su experiencia y sigo sus indicaciones', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'B', icon: '💬', title: 'Se lo digo directamente, le explico mis dudas o mi desacuerdo', desc: 'Prefiero ser honesto(a) y discutir abiertamente', color: '#e3f2fd', border: '#90caf9' },
        { id: 'C', icon: '🤐', title: 'Me quedo callado(a), pero por dentro no lo hago', desc: 'Evito el conflicto pero no sigo la sugerencia', color: '#fff3e0', border: '#ffcc80' },
        { id: 'D', icon: '🤝', title: 'Intento buscar una solución intermedia o una alternativa', desc: 'Busco un punto medio que funcione para ambos', color: '#f3e5f5', border: '#ce93d8' }
      ]
    }
  };

  const section4Questions = {
    question8: {
      title: '¿Si pudieras elegir una analogía para tu proceso terapéutico, ¿cuál sería?',
      description: 'Imagina que tu proceso terapéutico fuera como...',
      options: [
        { id: 'A', icon: '🏔️', title: 'Una guía de montaña', desc: 'Alguien que me ayude a navegar el camino', color: '#e3f2fd', border: '#90caf9' },
        { id: 'B', icon: '🌱', title: 'Un jardinero', desc: 'Alguien que cultive y cuide mi crecimiento', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'C', icon: '🪞', title: 'Un espejo', desc: 'Alguien que me ayude a verme tal como soy', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'D', icon: '🔍', title: 'Un detective', desc: 'Alguien que investigue y descubra la verdad', color: '#fff3e0', border: '#ffcc80' }
      ]
    },
    question9: {
      title: '¿Qué te recarga las pilas?',
      description: 'Después de una semana intensa, ¿cuál de estas actividades te ayuda más a sentirte recargado(a) y listo(a) para seguir?',
      options: [
        { id: 'A', icon: '🧘', title: 'Estar solo(a) y reflexionar', desc: 'Necesito tiempo para mí y mis pensamientos', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'B', icon: '👥', title: 'Conectar con amigos/familia', desc: 'Me energiza estar con personas que quiero', color: '#e3f2fd', border: '#90caf9' },
        { id: 'C', icon: '🏃', title: 'Mover el cuerpo', desc: 'El ejercicio me da energía y claridad', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'D', icon: '🎨', title: 'Crear algo', desc: 'Me recarga expresar mi creatividad', color: '#fff3e0', border: '#ffcc80' },
        { id: 'E', icon: '📚', title: 'Aprender algo nuevo', desc: 'Me motiva adquirir nuevos conocimientos', color: '#ffeaea', border: '#ffb3b3' }
      ]
    },
    question10: {
      title: '¿Qué es lo más valioso para ti en la vida?',
      description: 'Si solo pudieras salvar 3 cosas de un incendio (no materiales y no personas), ¿cuáles representarían lo más importante de tu vida? Piensa en conceptos o valores.',
      options: [
        { id: 'A', icon: '🕊️', title: 'Paz interior / Tranquilidad', desc: 'La calma y serenidad en mi mente', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'B', icon: '🌱', title: 'Aprendizaje / Crecimiento', desc: 'Seguir desarrollándome como persona', color: '#e3f2fd', border: '#90caf9' },
        { id: 'C', icon: '🤝', title: 'Conexión / Pertenencia', desc: 'Sentir que pertenezco y me conecto', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'D', icon: '💫', title: 'Contribución / Impacto', desc: 'Hacer una diferencia en el mundo', color: '#fff3e0', border: '#ffcc80' },
        { id: 'E', icon: '🦅', title: 'Autonomía / Libertad', desc: 'Ser independiente y libre de elegir', color: '#ffeaea', border: '#ffb3b3' },
        { id: 'F', icon: '🏆', title: 'Éxito / Logro', desc: 'Alcanzar mis metas y objetivos', color: '#f0f8ff', border: '#87ceeb' }
      ]
    },
    question11: {
      title: '¿Cómo te ves en el futuro?',
      description: 'Si te imaginas en 5 años y te sientes plenamente realizado(a), ¿cuál de estas frases describe mejor tu sentir?',
      options: [
        { id: 'A', icon: '✨', title: 'Estoy en paz con mi pasado y listo(a) para el futuro', desc: 'He sanado y estoy preparado(a) para lo que viene', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'B', icon: '💕', title: 'Mis relaciones son sólidas y me siento conectado(a)', desc: 'Tengo vínculos saludables y significativos', color: '#e3f2fd', border: '#90caf9' },
        { id: 'C', icon: '🌟', title: 'Estoy haciendo un impacto positivo en lo que me importa', desc: 'Mi trabajo y acciones tienen un propósito', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'D', icon: '💪', title: 'Me siento fuerte, capaz y he logrado mis metas', desc: 'He alcanzado mis objetivos y me siento competente', color: '#fff3e0', border: '#ffcc80' },
        { id: 'E', icon: '🌺', title: 'He crecido, me conozco mejor y me acepto tal como soy', desc: 'Me he desarrollado y me acepto completamente', color: '#ffeaea', border: '#ffb3b3' }
      ]
    }
  };

  const section5Questions = {
    question12: {
      title: '¿Qué te impulsa a iniciar este proceso ahora?',
      description: 'Si tuvieras que ponerle un título a la razón principal que te impulsa a buscar terapia en este momento, ¿cuál sería?',
      options: [
        { id: 'A', icon: '⚡', title: 'Estoy en un punto de quiebre', desc: 'Necesito ayuda urgente para superar esta crisis', color: '#ffeaea', border: '#ffb3b3' },
        { id: 'B', icon: '🌱', title: 'Busco crecimiento personal', desc: 'Quiero desarrollarme y mejorar como persona', color: '#e8f5e8', border: '#b2f2d7' },
        { id: 'C', icon: '🔍', title: 'Necesito entender mi pasado', desc: 'Quiero procesar y sanar experiencias anteriores', color: '#e3f2fd', border: '#90caf9' },
        { id: 'D', icon: '💕', title: 'Quiero mejorar mis relaciones', desc: 'Busco herramientas para conectar mejor con otros', color: '#f3e5f5', border: '#ce93d8' },
        { id: 'E', icon: '👥', title: 'Mi médico/amigo me lo recomendó', desc: 'Alguien cercano me sugirió buscar apoyo profesional', color: '#fff3e0', border: '#ffcc80' },
        { id: 'F', icon: '✏️', title: 'Otro (Describe brevemente)', desc: 'Tengo otra razón que me gustaría explicar', color: '#f0f8ff', border: '#87ceeb' }
      ]
    }
  };

  const renderSection1 = () => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ 
        fontWeight: 'bold', 
        fontSize: 'clamp(18px, 4vw, 24px)', 
        color: '#333', 
        margin: '0 0 16px 0',
        textAlign: 'center'
      }}>
        Sección 1: Tu Motivación y Situación Actual
      </h2>
      
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: 'clamp(16px, 3.5vw, 20px)', 
          color: '#333', 
          margin: '0 0 8px 0',
          textAlign: 'center'
        }}>
          1. ¿Qué te trae por aquí?
        </h3>
        <p style={{ 
          color: '#666', 
          fontSize: 'clamp(14px, 3vw, 16px)', 
          margin: '0 0 16px 0',
          textAlign: 'center',
          lineHeight: '1.5'
        }}>
          <strong>Pregunta:</strong> Si tuvieras que describir brevemente por qué estás buscando apoyo, ¿cuál de estas situaciones se parece más a lo que sientes?
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '16px',
        '@media (min-width: 768px)': {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }
      }}>
        {section1Options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect('section1', null, option)}
            style={{
              background: answers.section1?.id === option.id ? option.color : '#fff',
              border: `2.5px solid ${answers.section1?.id === option.id ? '#0057FF' : option.border}`,
              borderRadius: 16,
              padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2.5vw, 20px)',
              textAlign: 'left',
              cursor: 'pointer',
              boxShadow: answers.section1?.id === option.id ? '0 2px 12px #0057ff22' : 'none',
              transition: 'all 0.18s',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'clamp(12px, 2vw, 18px)',
              fontSize: 'clamp(14px, 2.5vw, 17px)',
              fontWeight: 600,
              transform: answers.section1?.id === option.id ? 'scale(1.02)' : 'scale(1)',
              minHeight: '80px'
            }}
            onMouseEnter={(e) => {
              if (answers.section1?.id !== option.id) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.section1?.id !== option.id) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{ 
              fontSize: 'clamp(24px, 5vw, 32px)', 
              marginTop: 2,
              flexShrink: 0
            }}>{option.icon}</span>
            <span style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: 700, 
                color: '#222', 
                marginBottom: 4,
                fontSize: 'clamp(14px, 2.5vw, 16px)'
              }}>{option.title}</div>
              <div style={{ 
                fontWeight: 400, 
                color: '#666', 
                fontSize: 'clamp(12px, 2.2vw, 15px)',
                lineHeight: '1.4'
              }}>{option.desc}</div>
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ 
        fontWeight: 'bold', 
        fontSize: 'clamp(18px, 4vw, 24px)', 
        color: '#333', 
        margin: '0 0 16px 0',
        textAlign: 'center'
      }}>
        Sección 2: Tus Deseos y Expectativas sobre la Terapia
      </h2>
      
      {Object.entries(section2Questions).map(([questionKey, question]) => (
        <div key={questionKey} style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: 'clamp(16px, 3.5vw, 20px)', 
              color: '#333', 
              margin: '0 0 8px 0',
              textAlign: 'center'
            }}>
              {questionKey === 'question2' ? '2. ' : questionKey === 'question3' ? '3. ' : '4. '}{question.title}
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: 'clamp(14px, 3vw, 16px)', 
              margin: '0 0 16px 0',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              <strong>Pregunta:</strong> {question.description}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            '@media (min-width: 768px)': {
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }
          }}>
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect('section2', questionKey, option)}
                style={{
                  background: answers.section2[questionKey]?.id === option.id ? option.color : '#fff',
                  border: `2.5px solid ${answers.section2[questionKey]?.id === option.id ? '#0057FF' : option.border}`,
                  borderRadius: 16,
                  padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2.5vw, 20px)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: answers.section2[questionKey]?.id === option.id ? '0 2px 12px #0057ff22' : 'none',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(12px, 2vw, 18px)',
                  fontSize: 'clamp(14px, 2.5vw, 17px)',
                  fontWeight: 600,
                  transform: answers.section2[questionKey]?.id === option.id ? 'scale(1.02)' : 'scale(1)',
                  minHeight: '80px'
                }}
                onMouseEnter={(e) => {
                  if (answers.section2[questionKey]?.id !== option.id) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers.section2[questionKey]?.id !== option.id) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <span style={{ 
                  fontSize: 'clamp(24px, 5vw, 32px)', 
                  marginTop: 2,
                  flexShrink: 0
                }}>{option.icon}</span>
                <span style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 700, 
                    color: '#222', 
                    marginBottom: 4,
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }}>{option.title}</div>
                  <div style={{ 
                    fontWeight: 400, 
                    color: '#666', 
                    fontSize: 'clamp(12px, 2.2vw, 15px)',
                    lineHeight: '1.4'
                  }}>{option.desc}</div>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection3 = () => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ 
        fontWeight: 'bold', 
        fontSize: 'clamp(18px, 4vw, 24px)', 
        color: '#333', 
        margin: '0 0 16px 0',
        textAlign: 'center'
      }}>
        Sección 3: Tu Estilo de Trabajo en Terapia y Comunicación
      </h2>
      
      {Object.entries(section3Questions).map(([questionKey, question]) => (
        <div key={questionKey} style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: 'clamp(16px, 3.5vw, 20px)', 
              color: '#333', 
              margin: '0 0 8px 0',
              textAlign: 'center'
            }}>
              {questionKey === 'question5' ? '5. ' : questionKey === 'question6' ? '6. ' : '7. '}{question.title}
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: 'clamp(14px, 3vw, 16px)', 
              margin: '0 0 16px 0',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              <strong>Pregunta:</strong> {question.description}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            '@media (min-width: 768px)': {
              display: 'grid',
              gridTemplateColumns: question.options.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr',
              gap: '24px'
            }
          }}>
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect('section3', questionKey, option)}
                style={{
                  background: answers.section3[questionKey]?.id === option.id ? option.color : '#fff',
                  border: `2.5px solid ${answers.section3[questionKey]?.id === option.id ? '#0057FF' : option.border}`,
                  borderRadius: 16,
                  padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2.5vw, 20px)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: answers.section3[questionKey]?.id === option.id ? '0 2px 12px #0057ff22' : 'none',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(12px, 2vw, 18px)',
                  fontSize: 'clamp(14px, 2.5vw, 17px)',
                  fontWeight: 600,
                  transform: answers.section3[questionKey]?.id === option.id ? 'scale(1.02)' : 'scale(1)',
                  minHeight: '80px'
                }}
                onMouseEnter={(e) => {
                  if (answers.section3[questionKey]?.id !== option.id) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers.section3[questionKey]?.id !== option.id) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <span style={{ 
                  fontSize: 'clamp(24px, 5vw, 32px)', 
                  marginTop: 2,
                  flexShrink: 0
                }}>{option.icon}</span>
                <span style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 700, 
                    color: '#222', 
                    marginBottom: 4,
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }}>{option.title}</div>
                  <div style={{ 
                    fontWeight: 400, 
                    color: '#666', 
                    fontSize: 'clamp(12px, 2.2vw, 15px)',
                    lineHeight: '1.4'
                  }}>{option.desc}</div>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection4 = () => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ 
        fontWeight: 'bold', 
        fontSize: 'clamp(18px, 4vw, 24px)', 
        color: '#333', 
        margin: '0 0 16px 0',
        textAlign: 'center'
      }}>
        Sección 4: Tu Mundo Interno y Aspiraciones
      </h2>
      
      {Object.entries(section4Questions).map(([questionKey, question]) => (
        <div key={questionKey} style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: 'clamp(16px, 3.5vw, 20px)', 
              color: '#333', 
              margin: '0 0 8px 0',
              textAlign: 'center'
            }}>
              {questionKey === 'question8' ? '8. ' : questionKey === 'question9' ? '9. ' : questionKey === 'question10' ? '10. ' : '11. '}{question.title}
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: 'clamp(14px, 3vw, 16px)', 
              margin: '0 0 16px 0',
              textAlign: 'center',
              lineHeight: '1.5'
            }}>
              <strong>Pregunta:</strong> {question.description}
            </p>
            {(questionKey === 'question9' || questionKey === 'question10') && (
              <p style={{ 
                color: '#0057FF', 
                fontSize: 'clamp(12px, 2.5vw, 14px)', 
                margin: '0 0 16px 0',
                fontStyle: 'italic',
                textAlign: 'center'
              }}>
                {questionKey === 'question9' ? 'Selecciona una opción.' : 'Selecciona hasta 3 opciones.'}
              </p>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            '@media (min-width: 768px)': {
              display: 'grid',
              gridTemplateColumns: question.options.length <= 3 ? '1fr 1fr 1fr' : '1fr 1fr',
              gap: '24px'
            }
          }}>
            {question.options.map((option) => {
              const isSelected = questionKey === 'question8' || questionKey === 'question11' 
                ? answers.section4[questionKey]?.id === option.id
                : answers.section4[questionKey]?.includes(option.id);
              
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (questionKey === 'question8' || questionKey === 'question11') {
                      handleOptionSelect('section4', questionKey, option);
                    } else {
                      handleMultipleSelect('section4', questionKey, option.id);
                    }
                  }}
                  style={{
                    background: isSelected ? option.color : '#fff',
                    border: `2.5px solid ${isSelected ? '#0057FF' : option.border}`,
                    borderRadius: 16,
                    padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2.5vw, 20px)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 12px #0057ff22' : 'none',
                    transition: 'all 0.18s',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'clamp(12px, 2vw, 18px)',
                    fontSize: 'clamp(14px, 2.5vw, 17px)',
                    fontWeight: 600,
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    position: 'relative',
                    minHeight: '80px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: 'clamp(24px, 5vw, 32px)', 
                    marginTop: 2,
                    flexShrink: 0
                  }}>{option.icon}</span>
                  <span style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 700, 
                      color: '#222', 
                      marginBottom: 4,
                      fontSize: 'clamp(14px, 2.5vw, 16px)'
                    }}>{option.title}</div>
                    <div style={{ 
                      fontWeight: 400, 
                      color: '#666', 
                      fontSize: 'clamp(12px, 2.2vw, 15px)',
                      lineHeight: '1.4'
                    }}>{option.desc}</div>
                  </span>
                  {(questionKey === 'question9' || questionKey === 'question10') && isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: '#0057FF',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 'clamp(20px, 4vw, 24px)',
                      height: 'clamp(20px, 4vw, 24px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(12px, 2.5vw, 14px)',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSection5 = () => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ 
        fontWeight: 'bold', 
        fontSize: 'clamp(18px, 4vw, 24px)', 
        color: '#333', 
        margin: '0 0 16px 0',
        textAlign: 'center'
      }}>
        Sección 5: Detalles Específicos y Contexto Adicional
      </h2>
      
      {/* Pregunta 12 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: 'clamp(16px, 3.5vw, 20px)', 
            color: '#333', 
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            12. ¿Qué te impulsa a iniciar este proceso ahora?
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: 'clamp(14px, 3vw, 16px)', 
            margin: '0 0 16px 0',
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            <strong>Pregunta:</strong> {section5Questions.question12.description}
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '16px',
          '@media (min-width: 768px)': {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }
        }}>
          {section5Questions.question12.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect('section5', 'question12', option)}
              style={{
                background: answers.section5.question12?.id === option.id ? option.color : '#fff',
                border: `2.5px solid ${answers.section5.question12?.id === option.id ? '#0057FF' : option.border}`,
                borderRadius: 16,
                padding: 'clamp(16px, 3vw, 32px) clamp(12px, 2.5vw, 20px)',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: answers.section5.question12?.id === option.id ? '0 2px 12px #0057ff22' : 'none',
                transition: 'all 0.18s',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(12px, 2vw, 18px)',
                fontSize: 'clamp(14px, 2.5vw, 17px)',
                fontWeight: 600,
                transform: answers.section5.question12?.id === option.id ? 'scale(1.02)' : 'scale(1)',
                minHeight: '80px'
              }}
              onMouseEnter={(e) => {
                if (answers.section5.question12?.id !== option.id) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (answers.section5.question12?.id !== option.id) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <span style={{ 
                fontSize: 'clamp(24px, 5vw, 32px)', 
                marginTop: 2,
                flexShrink: 0
              }}>{option.icon}</span>
              <span style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: 700, 
                  color: '#222', 
                  marginBottom: 4,
                  fontSize: 'clamp(14px, 2.5vw, 16px)'
                }}>{option.title}</div>
                <div style={{ 
                  fontWeight: 400, 
                  color: '#666', 
                  fontSize: 'clamp(12px, 2.2vw, 15px)',
                  lineHeight: '1.4'
                }}>{option.desc}</div>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pregunta 13 - Campo de texto libre */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: 'clamp(16px, 3.5vw, 20px)', 
            color: '#333', 
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            13. ¿Hay algo más que quieras que tu futuro psicólogo sepa sobre ti o tus necesidades?
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: 'clamp(14px, 3vw, 16px)', 
            margin: '0 0 16px 0',
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            <strong>Pregunta:</strong> ¿Hay alguna otra información importante sobre ti, tus preferencias o lo que buscas en un psicólogo que te gustaría compartir?
          </p>
          <p style={{ 
            color: '#0057FF', 
            fontSize: 'clamp(12px, 2.5vw, 14px)', 
            margin: '0 0 16px 0',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Opcional - Máximo 300 caracteres
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <textarea
            value={answers.section5.question13}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 300) {
                setAnswers(prev => ({
                  ...prev,
                  section5: {
                    ...prev.section5,
                    question13: value
                  }
                }));
              }
            }}
            placeholder="Comparte cualquier información adicional que consideres importante para encontrar el psicólogo ideal para ti..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: 'clamp(12px, 2.5vw, 16px)',
              border: '2px solid #e0e7ef',
              borderRadius: 12,
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontFamily: 'inherit',
              resize: 'vertical',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0057FF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e7ef';
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: 'clamp(10px, 2vw, 12px)',
            color: answers.section5.question13.length > 250 ? '#ff6b6b' : '#999',
            background: '#fff',
            padding: '4px 8px',
            borderRadius: 4
          }}>
            {answers.section5.question13.length}/300
          </div>
        </div>
      </div>
    </div>
  );

  const canContinue = () => {
    if (currentSection === 1) {
      return answers.section1 !== null;
    } else if (currentSection === 2) {
      return answers.section2.question2 && answers.section2.question3 && answers.section2.question4;
    } else if (currentSection === 3) {
      return answers.section3.question5 && answers.section3.question6 && answers.section3.question7;
    } else if (currentSection === 4) {
      return answers.section4.question8 && 
             answers.section4.question9.length > 0 && 
             answers.section4.question10.length > 0 && 
             answers.section4.question11;
    } else if (currentSection === 5) {
      return answers.section5.question12;
    }
    return false;
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return renderSection1();
      case 2:
        return renderSection2();
      case 3:
        return renderSection3();
      case 4:
        return renderSection4();
      case 5:
        return renderSection5();
      default:
        return renderSection1();
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f6f8ff 0%, #fff 100%)', 
      padding: '20px 0' 
    }}>
      {/* Header */}
      <nav style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1rem 0', 
        marginBottom: '20px',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: 1300, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 20px'
        }}>
          <span 
            style={{
              fontWeight: 'bold',
              fontSize: 'clamp(20px, 4vw, 28px)',
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

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <ul style={{ 
              display: 'none',
              gap: '2rem', 
              listStyle: 'none', 
              margin: 0, 
              padding: 0, 
              fontSize: '16px', 
              fontWeight: 500,
              '@media (min-width: 768px)': {
                display: 'flex'
              }
            }}>
              <li>
                <button
                  onClick={() => handleNavigation('psychologists')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Psicólogos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('business')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Empresas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('about-us')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Acerca de
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('pricing')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Precios
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              '@media (min-width: 768px)': {
                display: 'none'
              }
            }}
          >
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              opacity: mobileMenuOpen ? '0' : '1'
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#0057FF',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <li>
                <button
                  onClick={() => handleNavigation('psychologists')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Psicólogos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('business')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Empresas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('about-us')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Acerca de
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('pricing')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Precios
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto', 
        background: '#fff', 
        borderRadius: 20, 
        boxShadow: '0 4px 24px #0057ff11', 
        padding: 'clamp(20px, 4vw, 48px) clamp(20px, 4vw, 40px)',
        width: 'calc(100% - 40px)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {renderCurrentSection()}

        {/* Navegación */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '16px',
          marginTop: '32px',
          '@media (min-width: 768px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0'
          }
        }}>
          <button
            onClick={handlePrev}
            disabled={currentSection === 1}
            style={{
              background: '#fff',
              color: '#0057FF',
              border: '2px solid #e0e7ef',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: currentSection === 1 ? 'not-allowed' : 'pointer',
              opacity: currentSection === 1 ? 0.5 : 1,
              transition: 'all 0.2s ease',
              width: '100%',
              '@media (min-width: 768px)': {
                width: 'auto',
                padding: '12px 32px'
              }
            }}
          >
            Anterior
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canContinue()}
            style={{
              background: canContinue() ? '#0057FF' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '16px 32px',
              fontWeight: 700,
              fontSize: '18px',
              cursor: canContinue() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              transform: canContinue() ? 'scale(1)' : 'scale(1)',
              width: '100%',
              '@media (min-width: 768px)': {
                width: 'auto',
                padding: '16px 48px'
              }
            }}
            onMouseEnter={(e) => {
              if (canContinue()) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 87, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (canContinue()) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {currentSection === 5 ? 'Finalizar' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireMatch; 