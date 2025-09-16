import React, { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/api';

const TestResults = ({ navigationProps, testAnswers }) => {
  const [patientProfile, setPatientProfile] = useState(null);
  const [therapeuticApproaches, setTherapeuticApproaches] = useState([]);
  const [compatiblePsychologists, setCompatiblePsychologists] = useState([]);
  const [recommendedPsychologist, setRecommendedPsychologist] = useState(null);
  const [otherOptions, setOtherOptions] = useState([]);
  const [psychologistsLoading, setPsychologistsLoading] = useState(false);
  const [psychologistsError, setPsychologistsError] = useState(null);

  // Determinar nivel de angustia basado en Q1 y Q12
  const determineNivelAngustia = (answers) => {
    const q1 = answers.section1?.id;
    const q12 = answers.section5?.question12?.id;
    
    if ((q1 === 'A' || q1 === 'B') && q12 === 'A') {
      return 'Alta';
    } else if (q1 === 'C' && q12 === 'B') {
      return 'Baja';
    } else {
      return 'Moderada';
    }
  };

  // Determinar disposición al cambio basado en Q7
  const determineDisposicionCambio = (answers) => {
    const q7 = answers.section3?.question7?.id;
    
    if (q7 === 'A' || q7 === 'C') {
      return 'Baja';
    } else if (q7 === 'B' || q7 === 'D') {
      return 'Alta';
    } else {
      return 'Media';
    }
  };

  // Determinar orientación temporal basado en Q1, Q11 y Q12
  const determineOrientacionTemporal = (answers) => {
    const q1 = answers.section1?.id;
    const q11 = answers.section4?.question11?.id;
    const q12 = answers.section5?.question12?.id;
    
    if (q1 === 'E' || q12 === 'C') {
      return 'Pasado';
    } else if (q11 === 'A' || q11 === 'C') {
      return 'Futuro';
    } else {
      return 'Presente';
    }
  };

  // Determinar estilo de trabajo basado en Q8 y Q5
  const determineEstiloTrabajo = (answers) => {
    const q8 = answers.section4?.question8?.id;
    const q5 = answers.section3?.question5?.id;
    
    if ((q8 === 'B' || q8 === 'C') || q5 === 'C') {
      return 'Reflexivo';
    } else if ((q8 === 'A' || q8 === 'D') || q5 === 'A') {
      return 'Proactivo';
    } else {
      return 'Equilibrado';
    }
  };

  // Generar tags específicos basados en las respuestas
  const generateTags = (answers) => {
    const tags = [];
    
    // Tags basados en Q1 (motivación inicial)
    const q1 = answers.section1?.id;
    if (q1 === 'A') tags.push('Depresión');
    if (q1 === 'B') tags.push('Ansiedad');
    if (q1 === 'C') tags.push('Claridad Mental');
    if (q1 === 'D') tags.push('Orientación');
    if (q1 === 'E') tags.push('Procesar Pasado');
    
    // Tags basados en Q2 (objetivo de sesión)
    const q2 = answers.section2?.question2?.id;
    if (q2 === 'A') tags.push('Tranquilidad');
    if (q2 === 'B') tags.push('Claridad');
    if (q2 === 'C') tags.push('Esperanza');
    if (q2 === 'D') tags.push('Fortaleza');
    if (q2 === 'E') tags.push('Ser Entendido');
    
    // Tags basados en Q3 (ambiente preferido)
    const q3 = answers.section2?.question3?.id;
    if (q3 === 'A') tags.push('Ambiente Informal');
    if (q3 === 'B') tags.push('Ambiente Tranquilo');
    if (q3 === 'C') tags.push('Ambiente Creativo');
    if (q3 === 'D') tags.push('Ambiente Abierto');
    
    // Tags basados en Q4 (preferencia de género)
    const q4 = answers.section2?.question4?.id;
    if (q4 === '1') tags.push('Prefiere Hombre');
    if (q4 === '2') tags.push('Inclinación Hombre');
    if (q4 === '3') tags.push('Indiferente');
    if (q4 === '4') tags.push('Inclinación Mujer');
    if (q4 === '5') tags.push('Prefiere Mujer');
    
    // Tags basados en Q5 (estilo de guía)
    const q5 = answers.section3?.question5?.id;
    if (q5 === 'A') tags.push('Estilo Directivo');
    if (q5 === 'B') tags.push('Estilo Equilibrado');
    if (q5 === 'C') tags.push('Estilo Reflexivo');
    
    // Tags basados en Q6 (comodidad con emociones)
    const q6 = answers.section3?.question6?.id;
    if (q6 === 'A') tags.push('Apertura Baja');
    if (q6 === 'B') tags.push('Apertura Media');
    if (q6 === 'C') tags.push('Apertura Alta');
    
    // Tags basados en Q8 (analogía terapéutica)
    const q8 = answers.section4?.question8?.id;
    if (q8 === 'A') tags.push('Guía de Montaña');
    if (q8 === 'B') tags.push('Jardinero');
    if (q8 === 'C') tags.push('Espejo');
    if (q8 === 'D') tags.push('Detective');
    
    // Tags basados en Q9 (recarga de energía)
    const q9 = answers.section4?.question9;
    if (q9 && q9.includes('A')) tags.push('Introspección');
    if (q9 && q9.includes('B')) tags.push('Social');
    if (q9 && q9.includes('C')) tags.push('Físico');
    if (q9 && q9.includes('D')) tags.push('Creativo');
    if (q9 && q9.includes('E')) tags.push('Intelectual');
    
    // Tags basados en Q10 (valores más importantes)
    const q10 = answers.section4?.question10;
    if (q10 && q10.includes('A')) tags.push('Paz Interior');
    if (q10 && q10.includes('B')) tags.push('Aprendizaje');
    if (q10 && q10.includes('C')) tags.push('Conexión');
    if (q10 && q10.includes('D')) tags.push('Contribución');
    if (q10 && q10.includes('E')) tags.push('Autonomía');
    if (q10 && q10.includes('F')) tags.push('Éxito');
    
    // Tags basados en Q11 (visión de futuro)
    const q11 = answers.section4?.question11?.id;
    if (q11 === 'A') tags.push('Sanación Pasado');
    if (q11 === 'B') tags.push('Relaciones Saludables');
    if (q11 === 'C') tags.push('Impacto Social');
    if (q11 === 'D') tags.push('Logro');
    if (q11 === 'E') tags.push('Autoconocimiento');
    
    // Tags basados en Q12 (motivación principal)
    const q12 = answers.section5?.question12?.id;
    if (q12 === 'A') tags.push('Punto de Quiebre');
    if (q12 === 'B') tags.push('Crecimiento Personal');
    if (q12 === 'C') tags.push('Procesar Pasado');
    if (q12 === 'D') tags.push('Mejorar Relaciones');
    if (q12 === 'E') tags.push('Referencia Externa');
    if (q12 === 'F') tags.push('Otro');
    
    return tags.slice(0, 10); // Máximo 10 tags
  };

  // Funciones auxiliares para determinar información específica
  const determineAreaEnfoque = (answers) => {
    const q1 = answers.section1?.id;
    const areas = {
      'A': 'la gestión emocional y el estado de ánimo',
      'B': 'el manejo del estrés y la ansiedad',
      'C': 'la claridad mental y toma de decisiones',
      'D': 'encontrar dirección y propósito en tu vida',
      'E': 'procesar y sanar experiencias del pasado'
    };
    return areas[q1] || 'tu bienestar emocional general';
  };

  const determineMotivacion = (answers) => {
    const q12 = answers.section5?.question12?.id;
    const motivaciones = {
      'A': 'estás en un punto de quiebre y necesitas apoyo urgente',
      'B': 'el crecimiento personal y desarrollo como persona',
      'C': 'entender y procesar tu pasado',
      'D': 'mejorar tus relaciones y conexiones con otros',
      'E': 'una recomendación de alguien cercano',
      'F': 'otras razones personales'
    };
    return motivaciones[q12] || 'el crecimiento personal';
  };

  const determineObjetivoPrincipal = (answers) => {
    const q2 = answers.section2?.question2?.id;
    const objetivos = {
      'A': 'más tranquilidad y calma interior',
      'B': 'claridad mental y orden en tus pensamientos',
      'C': 'esperanza y optimismo',
      'D': 'fuerza y valentía para enfrentar desafíos',
      'E': 'sentirte comprendido(a) y validado(a)'
    };
    return objetivos[q2] || 'bienestar y equilibrio';
  };

  const determineObjetivoLargoPlazo = (answers) => {
    const q11 = answers.section4?.question11?.id;
    const objetivos = {
      'A': 'en paz con tu pasado y preparado(a) para el futuro',
      'B': 'con relaciones sólidas y conexiones significativas',
      'C': 'haciendo un impacto positivo en lo que te importa',
      'D': 'fuerte, capaz y habiendo logrado tus metas',
      'E': 'habiendo crecido, conociéndote mejor y aceptándote tal como eres'
    };
    return objetivos[q11] || 'en un lugar de mayor bienestar y autoconocimiento';
  };

  const determineEstiloGuia = (answers) => {
    const q5 = answers.section3?.question5?.id;
    const estilos = {
      'A': 'más directo y orientado a la acción',
      'B': 'que combine guía con espacio para que decidas',
      'C': 'que principalmente escuche y reflexione contigo'
    };
    return estilos[q5] || 'que se adapte a tu estilo de trabajo';
  };

  const determineManejoTareas = (answers) => {
    const q7 = answers.section3?.question7?.id;
    const tareas = {
      'A': 'cómodo(a) con ideas para trabajar entre sesiones',
      'B': 'abierto(a) a discutir y adaptar las sugerencias',
      'C': 'prefieres no tener tareas específicas',
      'D': 'buscando un equilibrio en el trabajo entre sesiones'
    };
    return tareas[q7] || 'flexible con el trabajo entre sesiones';
  };

  const determineDisposicionAutoRevelacion = (answers) => {
    const q6 = answers.section3?.question6?.id;
    const disposiciones = {
      'A': 'te cuesta trabajo abrirte inicialmente',
      'B': 'tu apertura depende del momento y la persona',
      'C': 'estás abierto(a) a compartir tus emociones más profundas'
    };
    return disposiciones[q6] || 'progresivamente más abierto(a) a compartir';
  };

  const determinePreferenciasAdicionales = (answers) => {
    const preferencias = [];
    
    const q4 = answers.section2?.question4?.id;
    if (q4 === '1' || q4 === '2') preferencias.push('que tu psicólogo sea hombre');
    if (q4 === '4' || q4 === '5') preferencias.push('que tu psicóloga sea mujer');
    
    const q3 = answers.section2?.question3?.id;
    if (q3 === 'A') preferencias.push('un ambiente cálido y conversacional');
    if (q3 === 'B') preferencias.push('un espacio sereno para reflexionar');
    if (q3 === 'C') preferencias.push('un enfoque creativo y dinámico');
    if (q3 === 'D') preferencias.push('un ambiente abierto y fresco');
    
    return preferencias.length > 0 ? preferencias.join(', ') : 'que se adapte a tus necesidades';
  };

  // Función para procesar las respuestas del test y generar el perfil del paciente
  const processTestAnswers = (answers) => {
    const profile = {
      // Variables psicológicas principales
      nivelAngustia: determineNivelAngustia(answers),
      disposicionCambio: determineDisposicionCambio(answers),
      orientacionTemporal: determineOrientacionTemporal(answers),
      estiloTrabajoPaciente: determineEstiloTrabajo(answers),
      
      // Tags específicos basados en respuestas
      tags: generateTags(answers),
      
      // Información para el mensaje personalizado
      areaEnfoque: determineAreaEnfoque(answers),
      motivacion: determineMotivacion(answers),
      objetivoPrincipal: determineObjetivoPrincipal(answers),
      objetivoLargoPlazo: determineObjetivoLargoPlazo(answers),
      estiloGuia: determineEstiloGuia(answers),
      manejoTareas: determineManejoTareas(answers),
      disposicionAutoRevelacion: determineDisposicionAutoRevelacion(answers),
      preferenciasAdicionales: determinePreferenciasAdicionales(answers)
    };

    return profile;
  };

  // Recomendar enfoques terapéuticos basados en el perfil
  const recommendTherapeuticApproaches = (profile) => {
    const approaches = [];
    
    // TCC si prefiere directivo y tareas
    if (profile.tags.includes('Estilo Directivo') && 
        profile.tags.includes('Apertura Alta')) {
      approaches.push({
        name: 'Terapia Cognitivo-Conductual',
        description: 'Te ayuda a identificar y transformar pensamientos negativos que afectan tu comportamiento y emociones.'
      });
    }
    
    // DBT si tiene alta angustia y necesita regulación emocional
    if (profile.nivelAngustia === 'Alta' && 
        profile.tags.includes('Ansiedad')) {
      approaches.push({
        name: 'Terapia Dialéctico-Conductual',
        description: 'Especializada en regulación emocional y habilidades de afrontamiento, perfecta para momentos de alta intensidad emocional.'
      });
    }
    
    // Terapia Humanista si es reflexivo y busca autoconocimiento
    if (profile.estiloTrabajoPaciente === 'Reflexivo' && 
        profile.tags.includes('Autoconocimiento')) {
      approaches.push({
        name: 'Terapia Humanista',
        description: 'Se enfoca en tu crecimiento personal y en conectar con tu autenticidad emocional.'
      });
    }
    
    // Terapia Sistémica si se enfoca en relaciones
    if (profile.tags.includes('Mejorar Relaciones') || 
        profile.tags.includes('Relaciones Saludables')) {
      approaches.push({
        name: 'Terapia Sistémica',
        description: 'Enfoque que considera el contexto de tus relaciones y sistemas, ideal para mejorar conexiones significativas.'
      });
    }
    
    // Si no hay suficientes enfoques, agregar algunos generales
    if (approaches.length < 2) {
      if (!approaches.find(a => a.name.includes('Cognitivo-Conductual'))) {
        approaches.push({
          name: 'Terapia Cognitivo-Conductual',
          description: 'Te ayuda a identificar y transformar pensamientos negativos que afectan tu comportamiento y emociones.'
        });
      }
      if (!approaches.find(a => a.name.includes('Humanista'))) {
        approaches.push({
          name: 'Terapia Humanista',
          description: 'Se enfoca en tu crecimiento personal y en conectar con tu autenticidad emocional.'
        });
      }
    }
    
    return approaches.slice(0, 3); // Máximo 3 enfoques
  };

  // Generar psicólogos compatibles basados en el perfil
  const generateCompatiblePsychologists = (profile, approaches) => {
    const psychologists = [
      {
        id: 1,
        nombre: 'valentina prueba',
        tipoTerapia: 'Terapia Gestalt',
        descripcion: 'soy prueba',
        tags: ['Adicciones', 'Trastornos del sueño', 'Fobias'],
        imagen: '👩‍⚕️',
        video: true
      },
      {
        id: 2,
        nombre: 'psicologo psicologo',
        tipoTerapia: 'Terapia Cognitivo-Conductual (TCC), Terapia Gestalt, Terapia Sistémica, Terapia de Aceptación y Compromiso (ACT)',
        descripcion: 'este perfil es una prueba',
        tags: ['Relaciones interpersonales', 'Autoestima', 'Ansiedad'],
        imagen: '👩‍⚕️',
        video: true
      }
    ];

    // Filtrar psicólogos basados en el perfil del usuario
    return psychologists.filter(psychologist => {
      // Verificar si hay coincidencia en tags
      const tagMatches = psychologist.tags.some(tag => 
        profile.tags.some(profileTag => 
          profileTag.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(profileTag.toLowerCase())
        )
      );

      // Verificar si hay coincidencia en tipo de terapia
      const therapyMatches = approaches.some(approach =>
        psychologist.tipoTerapia.toLowerCase().includes(approach.name.toLowerCase())
      );

      return tagMatches || therapyMatches;
    });
  };

  // Función para obtener psicólogos activos del backend
  const fetchActivePsychologists = async () => {
    setPsychologistsLoading(true);
    setPsychologistsError(null);
    
    try {
      // Obtener el ID del psicólogo recomendado desde localStorage
      const storedTags = localStorage.getItem('empathica_test_tags');
      let recommendedPsychologistId = null;
      
      if (storedTags) {
        try {
          const tagsData = JSON.parse(storedTags);
          recommendedPsychologistId = tagsData.recommendedPsychologistId;
          console.log('ID del psicólogo recomendado encontrado:', recommendedPsychologistId);
        } catch (parseError) {
          console.error('Error al parsear tags del localStorage:', parseError);
        }
      }
      
      // Obtener todos los psicólogos activos
      const response = await userService.getAllPsychologists();
      const psychologists = response.content || response || [];
      
      // Filtrar solo psicólogos activos
      const activePsychologists = psychologists.filter(psy => psy.userStatus === 'ACTIVE');
      
      if (activePsychologists.length >= 3) {
        let recommended = null;
        let otherPsychologists = [];
        
        if (recommendedPsychologistId) {
          try {
            // Obtener detalles específicos del psicólogo recomendado usando el endpoint privado
            const recommendedPsychologistDetails = await userService.getPsychologistById(recommendedPsychologistId);
            
            if (recommendedPsychologistDetails) {
              // Transformar el psicólogo recomendado con datos detallados
              recommended = {
                id: recommendedPsychologistDetails.userId || recommendedPsychologistDetails.id,
                nombre: `${recommendedPsychologistDetails.name} ${recommendedPsychologistDetails.lastName}`,
                especializacion: recommendedPsychologistDetails.specialty || 'Psicólogo Clínico',
                descripcion: recommendedPsychologistDetails.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
                imagen: '👩‍⚕️',
                experiencia: 'Psicólogo Clínico Certificado',
                enfoque: recommendedPsychologistDetails.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
                idiomas: 'Español',
                modalidad: 'Presencial y Online',
                cedula: recommendedPsychologistDetails.cedula || 'N/A',
                edades: recommendedPsychologistDetails.attendAges?.join(', ') || 'Adultos',
                modalidades: recommendedPsychologistDetails.additionalModalities?.join(', ') || 'Terapia individual'
              };
              
              console.log('Psicólogo recomendado específico cargado con detalles completos:', recommended);
            } else {
              throw new Error('No se encontraron detalles del psicólogo recomendado');
            }
          } catch (detailError) {
            console.warn('Error obteniendo detalles del psicólogo recomendado, usando datos del listado:', detailError);
            
            // Fallback: buscar en el listado de psicólogos activos
            const recommendedPsychologist = activePsychologists.find(psy => psy.userId === recommendedPsychologistId);
            
            if (recommendedPsychologist) {
              // Transformar el psicólogo recomendado
              recommended = {
                id: recommendedPsychologist.userId,
                nombre: `${recommendedPsychologist.name} ${recommendedPsychologist.lastName}`,
                especializacion: recommendedPsychologist.specialty || 'Psicólogo Clínico',
                descripcion: recommendedPsychologist.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
                imagen: '👩‍⚕️',
                experiencia: 'Psicólogo Clínico Certificado',
                enfoque: recommendedPsychologist.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
                idiomas: 'Español',
                modalidad: 'Presencial y Online',
                cedula: recommendedPsychologist.cedula || 'N/A',
                edades: recommendedPsychologist.attendAges?.join(', ') || 'Adultos',
                modalidades: recommendedPsychologist.additionalModalities?.join(', ') || 'Terapia individual'
              };
              
              console.log('Psicólogo recomendado específico cargado (fallback):', recommended);
            } else {
              console.warn('No se encontró el psicólogo recomendado con ID:', recommendedPsychologistId);
              // Usar el primer psicólogo activo como recomendado
              const firstPsychologist = activePsychologists[0];
              recommended = {
                id: firstPsychologist.userId,
                nombre: `${firstPsychologist.name} ${firstPsychologist.lastName}`,
                especializacion: firstPsychologist.specialty || 'Psicólogo Clínico',
                descripcion: firstPsychologist.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
                imagen: '👩‍⚕️',
                experiencia: 'Psicólogo Clínico Certificado',
                enfoque: firstPsychologist.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
                idiomas: 'Español',
                modalidad: 'Presencial y Online',
                cedula: firstPsychologist.cedula || 'N/A',
                edades: firstPsychologist.attendAges?.join(', ') || 'Adultos',
                modalidades: firstPsychologist.additionalModalities?.join(', ') || 'Terapia individual'
              };
            }
          }
        } else {
          // Si no hay ID guardado, usar el primer psicólogo activo como recomendado
          const firstPsychologist = activePsychologists[0];
          recommended = {
            id: firstPsychologist.userId,
            nombre: `${firstPsychologist.name} ${firstPsychologist.lastName}`,
            especializacion: firstPsychologist.specialty || 'Psicólogo Clínico',
            descripcion: firstPsychologist.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
            imagen: '👩‍⚕️',
            experiencia: 'Psicólogo Clínico Certificado',
            enfoque: firstPsychologist.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
            idiomas: 'Español',
            modalidad: 'Presencial y Online',
            cedula: firstPsychologist.cedula || 'N/A',
            edades: firstPsychologist.attendAges?.join(', ') || 'Adultos',
            modalidades: firstPsychologist.additionalModalities?.join(', ') || 'Terapia individual'
          };
        }
        
        // Obtener otros 2 psicólogos (excluyendo el recomendado)
        const otherActivePsychologists = activePsychologists.filter(psy => psy.userId !== recommended.id);
        const selectedOthers = otherActivePsychologists.slice(0, 2);
        
        otherPsychologists = selectedOthers.map((psy, index) => ({
          id: psy.userId || index + 1,
          nombre: `${psy.name} ${psy.lastName}`,
          especializacion: psy.specialty || 'Psicólogo Clínico',
          descripcion: psy.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
          imagen: '👩‍⚕️',
          experiencia: 'Psicólogo Clínico Certificado',
          enfoque: psy.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
          idiomas: 'Español',
          modalidad: 'Presencial y Online',
          cedula: psy.cedula || 'N/A',
          edades: psy.attendAges?.join(', ') || 'Adultos',
          modalidades: psy.additionalModalities?.join(', ') || 'Terapia individual'
        }));
        
        console.log('Otros psicólogos cargados:', otherPsychologists);
        
        setRecommendedPsychologist(recommended);
        setOtherOptions(otherPsychologists);
        
      } else {
        // Si no hay suficientes psicólogos activos, usar datos estáticos
        console.warn('No hay suficientes psicólogos activos, usando datos estáticos');
        const recommended = generateRecommendedPsychologist(testAnswers);
        const others = generateOtherOptions();
        
        setRecommendedPsychologist(recommended);
        setOtherOptions(others);
      }
      
    } catch (error) {
      console.error('Error al obtener psicólogos:', error);
      setPsychologistsError('Error al cargar los psicólogos');
      
      // Usar datos estáticos como fallback
      const recommended = generateRecommendedPsychologist(testAnswers);
      const others = generateOtherOptions();
      
      setRecommendedPsychologist(recommended);
      setOtherOptions(others);
    } finally {
      setPsychologistsLoading(false);
    }
  };

  // Función para generar el psicólogo recomendado basado en las respuestas (fallback)
  const generateRecommendedPsychologist = (answers) => {
    // Psicólogo recomendado real con datos de la imagen
    return {
      id: 14, // ID por defecto
      nombre: 'Christopher Vince Bravo Merino',
      especializacion: 'Psicólogo Clínico',
      descripcion: 'Especializado en terapia ACT (Acceptance and Commitment Therapy) y Mindfulness. Experto en el tratamiento de adultos y adolescentes con enfoque en arteterapia y técnicas de relajación.',
      imagen: '👨‍⚕️',
      experiencia: 'Psicólogo Clínico Certificado',
      enfoque: 'ACT, Mindfulness',
      idiomas: 'Español',
      modalidad: 'Presencial y Online',
      cedula: '545615skhs49684365',
      edades: 'Adultos, Adolescentes',
      modalidades: 'Arteterapia, Técnicas de relajación'
    };
  };

  // Función para generar otras opciones de psicólogos
  const generateOtherOptions = () => {
    return [
      {
        nombre: 'Dra. Ana María Rodríguez',
        especializacion: 'Psicóloga Especialista en Ansiedad',
        descripcion: 'Experta en terapia cognitivo-conductual para el manejo de la ansiedad y el estrés. Especializada en técnicas de respiración y mindfulness.',
        imagen: '👩‍⚕️',
        experiencia: '10 años de experiencia',
        enfoque: 'Terapia Cognitivo-Conductual',
        idiomas: 'Español, Inglés',
        modalidad: 'Presencial y Online',
        cedula: '12345678901234',
        edades: 'Adultos, Adolescentes',
        modalidades: 'Mindfulness, Técnicas de respiración'
      },
      {
        nombre: 'Dr. Carlos Eduardo Mendoza',
        especializacion: 'Psicólogo Especialista en Depresión',
        descripcion: 'Especializado en terapia de aceptación y compromiso para el tratamiento de la depresión. Experto en técnicas de activación conductual.',
        imagen: '👨‍⚕️',
        experiencia: '12 años de experiencia',
        enfoque: 'Terapia ACT, Activación Conductual',
        idiomas: 'Español',
        modalidad: 'Presencial y Online',
        cedula: '98765432109876',
        edades: 'Adultos',
        modalidades: 'Activación conductual, Terapia grupal'
      }
    ];
  };

  useEffect(() => {
    if (testAnswers) {
      const profile = processTestAnswers(testAnswers);
      setPatientProfile(profile);

      const approaches = recommendTherapeuticApproaches(profile);
      setTherapeuticApproaches(approaches);

      const psychologists = generateCompatiblePsychologists(profile, approaches);
      setCompatiblePsychologists(psychologists);

      // Obtener psicólogos activos del backend
      fetchActivePsychologists();
    }
  }, [testAnswers]);

  // useEffect separado para manejar el guardado de tags cuando cambie el patientProfile
  useEffect(() => {
    if (patientProfile && patientProfile.tags && patientProfile.tags.length > 0 && recommendedPsychologist) {
      const tagsForStorage = {
        tag1: {
          tagId: 0,
          name: patientProfile.tags[0] || "string",
          percentage: 0.1,
          patient: "string",
          session: "string"
        },
        tag2: {
          tagId: 0,
          name: patientProfile.tags[1] || "string",
          percentage: 0.1,
          patient: "string",
          session: "string"
        },
        tag3: {
          tagId: 0,
          name: patientProfile.tags[2] || "string",
          percentage: 0.1,
          patient: "string",
          session: "string"
        },
        recommendedPsychologistId: recommendedPsychologist.id
      };
      
      localStorage.setItem('empathica_test_tags', JSON.stringify(tagsForStorage));
      console.log('Tags y psicólogo recomendado guardados en localStorage:', tagsForStorage);
    }
  }, [patientProfile, recommendedPsychologist]);

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const isUserRegistered = navigationProps && navigationProps.isUserRegistered;

  // Determinar si el usuario está logueado verificando el token en localStorage
  const isUserLoggedIn = () => {
    const token = localStorage.getItem('empathica_token');
    return token && token.trim() !== '';
  };

  // Determinar si el usuario viene del dashboard (registrado) o del landing (no registrado)
  const isFromDashboard = isUserRegistered || isUserLoggedIn() || (navigationProps && navigationProps.location && navigationProps.location.state && navigationProps.location.state.fromDashboard);

  if (!patientProfile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f6f8ff 0%, #fff 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <div style={{ fontSize: 18, color: '#666' }}>Procesando tus respuestas...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f6f8ff 0%, #fff 100%)', 
      padding: '20px 0' 
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Header */}
      <nav style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1rem 0', 
        marginBottom: '20px'
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
        </div>
      </nav>

      {/* Contenido principal */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        
        {/* Título principal */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px' 
        }}>
          <h1 style={{ 
            fontWeight: 'bold', 
            fontSize: 'clamp(24px, 5vw, 32px)', 
            color: '#0057FF', 
            margin: '0 0 16px 0',
            lineHeight: '1.3'
          }}>
            ¡Nos encanta conocerte! ✨
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: 'clamp(16px, 3vw, 18px)', 
            margin: 0,
            lineHeight: '1.5'
          }}>
            Encuentra tu psicólogo ideal con nuestro sistema de matching emocional
          </p>
            {!isFromDashboard && (
        <div style={{ 
                background: '#f0f8ff',
                border: '1px solid #0057FF',
                borderRadius: 12,
                padding: '16px',
                marginTop: '20px',
                maxWidth: '600px',
                margin: '20px auto 0 auto'
              }}>
                <p style={{
                  color: '#0057FF',
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  margin: 0,
                  fontWeight: 500
                }}>
                  💡 <strong>Próximo paso:</strong> Para acceder a tu psicólogo recomendado y comenzar tu proceso terapéutico, necesitas crear una cuenta gratuita.
          </p>
        </div>
            )}

            {isFromDashboard && (
        <div style={{ 
                background: '#e8f5e8',
                border: '1px solid #28a745',
                borderRadius: 12,
                padding: '16px',
                marginTop: '20px',
                maxWidth: '600px',
                margin: '20px auto 0 auto'
              }}>
                <p style={{
                  color: '#28a745',
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  margin: 0,
                  fontWeight: 500
                }}>
                  ✅ <strong>¡Perfecto!</strong> Ya tienes una cuenta. Puedes continuar con tu psicólogo recomendado o explorar otras opciones.
                </p>
              </div>
            )}
          </div>

                     {/* Perfil del usuario */}
          <div style={{ 
             maxWidth: '800px',
             margin: '0 auto'
          }}>
            
            {/* Tu Perfil Emocional */}
            <div style={{ 
              background: '#fff', 
              borderRadius: 20, 
              boxShadow: '0 4px 24px #0057ff11', 
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h2 style={{ 
                fontWeight: 'bold', 
                fontSize: 'clamp(20px, 4vw, 24px)', 
                color: '#0057FF', 
                margin: '0 0 24px 0'
              }}>
                Tu Perfil Emocional
              </h2>
              
              {/* Información General */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontWeight: 600, 
                  color: '#333', 
                  margin: '0 0 16px 0',
                  fontSize: 'clamp(16px, 3vw, 18px)'
                }}>
                  Tu Perfil de Respuestas
                </h3>
                <div style={{ 
                  fontSize: 'clamp(14px, 2.5vw, 16px)', 
                  lineHeight: 1.6,
                  color: '#666'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Test completado:</strong> 100%
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Secciones respondidas:</strong> 5/5
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Perfil generado:</strong> Personalizado
                  </div>
                </div>
              </div>

              {/* Descripción del perfil */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontWeight: 600, 
                  color: '#333', 
                  margin: '0 0 16px 0',
                  fontSize: 'clamp(16px, 3vw, 18px)'
                }}>
                  Tu Perfil Emocional
                </h3>
                <p style={{ 
                  color: '#666', 
                  fontSize: 'clamp(14px, 2.5vw, 16px)', 
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  Vemos que eres una persona que te preocupa {patientProfile.areaEnfoque}. 
                  Actualmente experimentas {patientProfile.nivelAngustia === 'Alta' ? 'ansiedad' : 'estrés'}, 
                  te sientes estresado/a a menudo. Te interesa sentirte más segura emocionalmente, 
                  especialmente en tus relaciones personales y laborales. Buscas un acompañamiento 
                  que te ayude a fortalecer tus vínculos y tomar decisiones con más claridad.
                </p>
              </div>

              {/* Lo que nos has contado */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  fontWeight: 600, 
                  color: '#333', 
                  margin: '0 0 16px 0',
                  fontSize: 'clamp(16px, 3vw, 18px)'
                }}>
                  Lo que Nos Has Contado
                </h3>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {patientProfile.tags.slice(0, 3).map((tag, index) => (
                    <div key={index} style={{
                      background: '#f0f4ff',
                      color: '#0057FF',
                      padding: '12px 16px',
                      borderRadius: 12,
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      fontWeight: 500
                    }}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enfoques Recomendados */}
            <div style={{ 
              background: '#fff', 
              borderRadius: 20, 
              boxShadow: '0 4px 24px #0057ff11', 
              padding: '32px'
            }}>
              <h2 style={{ 
                fontWeight: 'bold', 
                fontSize: 'clamp(20px, 4vw, 24px)', 
                color: '#0057FF', 
                margin: '0 0 24px 0'
              }}>
                Enfoques Recomendados para Ti
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '20px'
              }}>
                {therapeuticApproaches.map((approach, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '60px',
                      background: '#0057FF',
                      borderRadius: '2px',
                      flexShrink: 0
                    }}></div>
                    <div>
                      <h4 style={{ 
                        fontWeight: 600, 
                        color: '#333', 
                        margin: '0 0 8px 0',
                        fontSize: 'clamp(16px, 3vw, 18px)'
                      }}>
                        {approach.name}
                      </h4>
                      <p style={{ 
                        color: '#666', 
                        fontSize: 'clamp(14px, 2.5vw, 16px)', 
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {approach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sección del Psicólogo Recomendado */}
          <div style={{ 
              marginTop: '48px',
              background: '#fff', 
              borderRadius: 20, 
              boxShadow: '0 4px 24px #0057ff11', 
              padding: '32px'
            }}>
            <h2 style={{ 
              fontWeight: 'bold', 
              fontSize: 'clamp(20px, 4vw, 24px)', 
              color: '#0057FF', 
                margin: '0 0 24px 0',
                textAlign: 'center'
            }}>
                Tu Psicólogo Recomendado
            </h2>

            {/* Indicador de carga */}
            {psychologistsLoading && (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px'
              }}>
                <div style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #0057FF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{
                  marginTop: '16px',
                  color: '#666',
                  fontSize: '16px'
                }}>
                  Cargando psicólogos recomendados...
                </p>
              </div>
            )}

            {/* Mensaje de error */}
            {psychologistsError && (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#dc3545'
              }}>
                <p style={{
                  fontSize: '16px',
                  marginBottom: '16px'
                }}>
                  {psychologistsError}
                </p>
                <button
                  onClick={fetchActivePsychologists}
                  style={{
                    background: '#0057FF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Contenido de psicólogos */}
            {!psychologistsLoading && !psychologistsError && recommendedPsychologist && (
              <>
                {/* Información del psicólogo */}
            <div style={{ 
              display: 'flex', 
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '24px'
                }}>
                {/* Avatar */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#f0f4ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0
                }}>
                  {recommendedPsychologist.imagen}
                </div>
                
                {/* Información */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontWeight: 'bold', 
                    color: '#333', 
                    margin: '0 0 8px 0',
                    fontSize: 'clamp(18px, 3vw, 20px)'
                  }}>
                    {recommendedPsychologist.nombre}
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    fontSize: 'clamp(14px, 2.5vw, 16px)', 
                    margin: '0 0 8px 0',
                    fontWeight: '500'
                  }}>
                    {recommendedPsychologist.especializacion}
                  </p>
                  <p style={{ 
                    color: '#666', 
                    fontSize: 'clamp(14px, 2.5vw, 16px)', 
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {recommendedPsychologist.descripcion}
                  </p>
                </div>
              </div>

              {/* Detalles adicionales */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Experiencia
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {recommendedPsychologist.experiencia}
                  </div>
                </div>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Enfoque
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {recommendedPsychologist.enfoque}
                  </div>
                </div>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Modalidad
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {recommendedPsychologist.modalidad}
                  </div>
                </div>
              </div>

              {/* Información adicional del psicólogo recomendado */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Edades que atiende
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {recommendedPsychologist.edades}
                  </div>
                </div>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Modalidades adicionales
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {recommendedPsychologist.modalidades}
                  </div>
                </div>
                
                <div style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px'
                  }}>
                    Cédula Profesional
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {recommendedPsychologist.cedula}
                  </div>
                </div>
              </div>
              </>
            )}
          </div>

          {/* Sección de Otras Opciones */}
          {otherOptions.length > 0 && (
            <div style={{ 
              marginTop: '48px',
                  background: '#fff',
                  borderRadius: 20,
                  boxShadow: '0 4px 24px #0057ff11',
              padding: '32px'
            }}>
              <h2 style={{ 
                fontWeight: 'bold', 
                fontSize: 'clamp(20px, 4vw, 24px)', 
                color: '#333', 
                margin: '0 0 24px 0',
                textAlign: 'center'
              }}>
                Otras Opciones
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {otherOptions.map((psychologist, index) => (
                  <div key={index} style={{
                    background: '#f8f9fa',
                    borderRadius: '16px',
                  padding: '24px',
                    border: '2px solid #e9ecef'
                }}>
                    {/* Información del psicólogo */}
                  <div style={{
                    display: 'flex',
                      alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                      {/* Avatar */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                        background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      {psychologist.imagen}
                    </div>
                      
                      {/* Información */}
                    <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontWeight: 'bold', 
                        color: '#333', 
                          margin: '0 0 4px 0',
                          fontSize: '16px'
                      }}>
                        {psychologist.nombre}
                        </h4>
                      <p style={{ 
                          color: '#666', 
                          fontSize: '14px', 
                          margin: 0,
                          fontWeight: '500'
                        }}>
                          {psychologist.especializacion}
                        </p>
                      </div>
                    </div>

                    {/* Descripción */}
                      <p style={{ 
                        color: '#666', 
                      fontSize: '14px', 
                      lineHeight: '1.5',
                        margin: '0 0 16px 0'
                      }}>
                        {psychologist.descripcion}
                      </p>

                    {/* Detalles */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        background: '#fff',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#666',
                          marginBottom: '2px'
                        }}>
                          Enfoque
                        </div>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {psychologist.enfoque}
                    </div>
                  </div>

                  <div style={{ 
                        background: '#fff',
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#666',
                          marginBottom: '2px'
                        }}>
                          Experiencia
                        </div>
                        <div style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {psychologist.experiencia}
                        </div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '12px'
                    }}>
                      <div><strong>Edades:</strong> {psychologist.edades}</div>
                      <div><strong>Modalidades:</strong> {psychologist.modalidades}</div>
                      <div><strong>Cédula:</strong> {psychologist.cedula}</div>
                    </div>
                  </div>
                    ))}
                  </div>
            </div>
          )}

                     {/* Botones de acción */}
                  <div style={{
             textAlign: 'center', 
             marginTop: '48px' 
           }}>
             {isFromDashboard ? (
               // Flujo para usuarios registrados (desde dashboard)
               <div style={{ 
                        display: 'flex',
                 flexDirection: 'column',
                 gap: '16px',
                        alignItems: 'center',
                 '@media (min-width: 768px)': {
                   flexDirection: 'row',
                   justifyContent: 'center',
                   gap: '16px'
                 }
               }}>
                 <button 
                   onClick={() => handleNavigation('client-dashboard')}
                   style={{ 
                     background: '#0057FF', 
                     color: '#fff', 
                     border: 'none', 
                     borderRadius: 14, 
                     padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 40px)', 
                     fontWeight: 700, 
                     fontSize: 'clamp(16px, 3vw, 18px)', 
                     cursor: 'pointer', 
                     boxShadow: '0 4px 16px rgba(0, 87, 255, 0.3)',
                     transition: 'all 0.2s ease',
                     width: '100%',
                     maxWidth: '300px',
                     '@media (min-width: 768px)': {
                       width: 'auto'
                     }
                      }}
                      onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'scale(1.05)';
                     e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 87, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'scale(1)';
                     e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 87, 255, 0.3)';
                      }}
                      >
                   Ir a mi dashboard
                      </button>
                 
                 <button 
                   onClick={() => handleNavigation('psychologists')}
                   style={{ 
                     background: '#fff', 
                     color: '#0057FF', 
                     border: '2px solid #0057FF', 
                     borderRadius: 14, 
                     padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 40px)', 
                     fontWeight: 700, 
                     fontSize: 'clamp(16px, 3vw, 18px)', 
                      cursor: 'pointer',
                     transition: 'all 0.2s ease',
                     width: '100%',
                     maxWidth: '300px',
                     '@media (min-width: 768px)': {
                       width: 'auto'
                     }
                    }}
                    onMouseEnter={(e) => {
                     e.currentTarget.style.background = '#f0f4ff';
                    }}
                    onMouseLeave={(e) => {
                     e.currentTarget.style.background = '#fff';
                    }}
                    >
                   Ver más psicólogos
                    </button>
                  </div>
             ) : (
               // Flujo para usuarios no registrados (desde landing)
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            '@media (min-width: 768px)': {
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '16px'
            }
          }}>
            <button 
                   onClick={() => handleNavigation('register')}
              style={{ 
                background: '#0057FF', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 14, 
                padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 40px)', 
                fontWeight: 700, 
                fontSize: 'clamp(16px, 3vw, 18px)', 
                cursor: 'pointer', 
                boxShadow: '0 4px 16px rgba(0, 87, 255, 0.3)',
                transition: 'all 0.2s ease',
                width: '100%',
                maxWidth: '300px',
                '@media (min-width: 768px)': {
                  width: 'auto'
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 87, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 87, 255, 0.3)';
              }}
            >
                   Regístrate para continuar
            </button>
            
            <button 
              onClick={() => handleNavigation('psychologists')}
              style={{ 
                background: '#fff', 
                color: '#0057FF', 
                border: '2px solid #0057FF', 
                borderRadius: 14, 
                padding: 'clamp(12px, 2.5vw, 16px) clamp(20px, 4vw, 40px)', 
                fontWeight: 700, 
                fontSize: 'clamp(16px, 3vw, 18px)', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                maxWidth: '300px',
                '@media (min-width: 768px)': {
                  width: 'auto'
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f4ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              Ver más psicólogos
            </button>
          </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default TestResults; 