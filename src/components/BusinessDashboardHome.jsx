import React, { useState, useEffect } from 'react';
import {
  Smile,
  Users,
  AlertTriangle,
  TrendingUp,
  Frown,
  Meh
} from 'lucide-react';
import { apiClient } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Constantes de tags/diagnósticos
const TAG_TYPES = {
  1: 'Ansiedad',
  2: 'Depresión',
  3: 'Conflicto de Pareja',
  4: 'Duelo',
  5: 'Trauma',
  6: 'Adolescencia',
  7: 'Familia',
  8: 'Adicciones',
  9: 'Trastornos Alimentarios',
  10: 'Autoestima',
  11: 'Relaciones Interpersonales',
  12: 'Trastornos de Sueño',
  13: 'Fobias',
  14: 'TOC',
  15: 'Trastorno Bipolar',
  16: 'Estrés Laboral',
  17: 'Manejo de Crisis'
};

const BusinessDashboardHome = ({ navigationProps }) => {
  const { user } = useAuth();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [employeesByDepartment, setEmployeesByDepartment] = useState({});
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [availableMetrics, setAvailableMetrics] = useState([]);
  const [metricsData, setMetricsData] = useState({});
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [emotionalState, setEmotionalState] = useState({
    tag: 'Sin datos',
    percentage: 0,
    icon: 'smile',
    color: '#2ecc71'
  });
  const [stressTags, setStressTags] = useState([]);
  const [departmentTags, setDepartmentTags] = useState({});

  // Función para obtener el total de empleados
  const fetchTotalEmployees = async () => {
    try {
      setLoading(true);
      console.log('=== DEBUG DASHBOARD ===');
      console.log('User:', user);
      console.log('User company:', user?.company);
      console.log('User companyId:', user?.company?.companyId);
      
      if (user && user?.company?.companyId) {
        console.log('Haciendo petición GET para obtener empleados...');
        const response = await apiClient.get(`/api/companies/${user.company.companyId}/patients?page=0&size=1`);
        console.log('Respuesta completa:', response.data);
        setTotalEmployees(response.data.totalElements || 0);
        console.log('Total de empleados obtenido:', response.data.totalElements);
      } else {
        console.log('No se puede hacer la petición - user o companyId no disponible');
        setTotalEmployees(0);
      }
    } catch (error) {
      console.error('Error obteniendo total de empleados:', error);
      setTotalEmployees(0);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener todos los empleados y calcular distribución por departamentos
  const fetchEmployeesByDepartments = async () => {
    try {
      setLoadingDepartments(true);
      console.log('=== OBTENIENDO EMPLEADOS POR DEPARTAMENTOS ===');
      
      if (!user?.company?.companyId) {
        console.log('No hay companyId disponible');
        return;
      }

      const companyId = user.company.companyId;
      let allEmployees = [];
      let currentPage = 0;
      let totalPages = 1;
      const pageSize = 50; // Tamaño de página para obtener más empleados por petición

      // Obtener todas las páginas
      while (currentPage < totalPages) {
        console.log(`Obteniendo página ${currentPage + 1} de ${totalPages}`);
        const response = await apiClient.get(`/api/companies/${companyId}/patients?page=${currentPage}&size=${pageSize}`);
        const data = response.data;
        
        if (data.content && data.content.length > 0) {
          allEmployees = [...allEmployees, ...data.content];
        }
        
        totalPages = data.totalPages || 1;
        currentPage++;
      }

      console.log('Total de empleados obtenidos:', allEmployees.length);
      console.log('Empleados:', allEmployees);

      // Calcular distribución por departamentos
      const departmentCounts = {};
      
      allEmployees.forEach(employee => {
        if (employee.department && employee.department.name) {
          const departmentName = employee.department.name;
          departmentCounts[departmentName] = (departmentCounts[departmentName] || 0) + 1;
        } else {
          // Empleados sin departamento asignado
          departmentCounts['Sin departamento'] = (departmentCounts['Sin departamento'] || 0) + 1;
        }
      });

      console.log('Distribución por departamentos:', departmentCounts);
      setEmployeesByDepartment(departmentCounts);

    } catch (error) {
      console.error('Error obteniendo empleados por departamentos:', error);
      setEmployeesByDepartment({});
    } finally {
      setLoadingDepartments(false);
    }
  };

  // Función para obtener las métricas disponibles
  const fetchAvailableMetrics = async () => {
    try {
      console.log('=== OBTENIENDO MÉTRICAS DISPONIBLES ===');
      const response = await apiClient.get('/api/metrics');
      const metrics = response.data;
      console.log('Métricas disponibles:', metrics);
      setAvailableMetrics(metrics);
      return metrics;
    } catch (error) {
      console.error('Error obteniendo métricas disponibles:', error);
      setAvailableMetrics([]);
      return [];
    }
  };

  // Función para obtener datos de una métrica específica
  const fetchMetricData = async (metricName) => {
    try {
      console.log(`=== OBTENIENDO DATOS DE MÉTRICA: ${metricName} ===`);
      const response = await apiClient.get(`/api/metrics/${metricName}`);
      const data = response.data;
      console.log(`Datos de ${metricName}:`, data);
      return data;
    } catch (error) {
      console.error(`Error obteniendo datos de métrica ${metricName}:`, error);
      return null;
    }
  };

  // Función para obtener todas las métricas
  const fetchAllMetrics = async () => {
    try {
      setLoadingMetrics(true);
      console.log('=== OBTENIENDO TODAS LAS MÉTRICAS ===');
      
      // Primero obtener las métricas disponibles
      const metrics = await fetchAvailableMetrics();
      
      if (metrics.length === 0) {
        console.log('No hay métricas disponibles');
        return;
      }

      // Obtener datos de cada métrica
      const metricsDataObj = {};
      
      for (const metricName of metrics) {
        console.log(`Obteniendo datos para métrica: ${metricName}`);
        const data = await fetchMetricData(metricName);
        if (data !== null) {
          metricsDataObj[metricName] = data;
        }
      }

      console.log('Datos de todas las métricas:', metricsDataObj);
      setMetricsData(metricsDataObj);

      // Procesar la métrica AVERAGE_TAG_PER_COMPANY si está disponible
      if (metricsDataObj['AVERAGE_TAG_PER_COMPANY']) {
        processAverageTagPerCompany(metricsDataObj['AVERAGE_TAG_PER_COMPANY']);
      }

      // Procesar la métrica AVERAGE_TAG_PER_DEPARTMENT si está disponible
      if (metricsDataObj['AVERAGE_TAG_PER_DEPARTMENT']) {
        processAverageTagPerDepartment(metricsDataObj['AVERAGE_TAG_PER_DEPARTMENT']);
      }

    } catch (error) {
      console.error('Error obteniendo todas las métricas:', error);
      setMetricsData({});
    } finally {
      setLoadingMetrics(false);
    }
  };

  // Función para procesar los datos de AVERAGE_TAG_PER_COMPANY
  const processAverageTagPerCompany = (data) => {
    try {
      console.log('=== PROCESANDO AVERAGE_TAG_PER_COMPANY ===');
      console.log('Datos recibidos:', data);

      if (!data || typeof data !== 'object') {
        console.log('Datos inválidos para procesar');
        return;
      }

      // Encontrar el tag con el promedio más alto
      let highestTag = null;
      let highestPercentage = 0;
      const stressTagsList = [];

      // Iterar sobre los datos para encontrar el tag con mayor promedio
      Object.entries(data).forEach(([tagId, percentage]) => {
        const tagIdNum = parseInt(tagId);
        const tagName = TAG_TYPES[tagIdNum];
        const percentageNum = parseFloat(percentage);

        if (tagName && percentageNum > highestPercentage) {
          highestTag = {
            id: tagIdNum,
            name: tagName,
            percentage: percentageNum
          };
          highestPercentage = percentageNum;
        }

        // Si el tag excede 75%, agregarlo a la lista de estrés
        if (percentageNum > 75) {
          stressTagsList.push({
            id: tagIdNum,
            name: tagName,
            percentage: percentageNum
          });
        }
      });

      console.log('Tag con mayor promedio:', highestTag);
      console.log('Tags de estrés (>75%):', stressTagsList);

      // Determinar el icono y color basado en el porcentaje
      let icon = 'smile';
      let color = '#2ecc71';

      if (highestPercentage > 66) {
        icon = 'frown'; // Carita triste
        color = '#e74c3c';
      } else if (highestPercentage > 33) {
        icon = 'meh'; // Carita intermedia
        color = '#f39c12';
      }

      // Actualizar el estado emocional
      setEmotionalState({
        tag: highestTag ? highestTag.name : 'Sin datos',
        percentage: highestPercentage,
        icon: icon,
        color: color
      });

      // Actualizar los tags de estrés
      setStressTags(stressTagsList);

    } catch (error) {
      console.error('Error procesando AVERAGE_TAG_PER_COMPANY:', error);
    }
  };

  // Función para procesar los datos de AVERAGE_TAG_PER_DEPARTMENT
  const processAverageTagPerDepartment = (data) => {
    try {
      console.log('=== PROCESANDO AVERAGE_TAG_PER_DEPARTMENT ===');
      console.log('Datos recibidos:', data);

      if (!data || typeof data !== 'object') {
        console.log('Datos inválidos para procesar');
        return;
      }

      const departmentTagsData = {};

      // Procesar cada departamento
      Object.entries(data).forEach(([departmentId, tagsData]) => {
        const deptId = parseInt(departmentId);
        let highestTag = null;
        let highestPercentage = 0;

        // Encontrar el tag con mayor porcentaje en este departamento
        Object.entries(tagsData).forEach(([tagId, percentage]) => {
          const tagIdNum = parseInt(tagId);
          const tagName = TAG_TYPES[tagIdNum];
          const percentageNum = parseFloat(percentage);

          if (tagName && percentageNum > highestPercentage) {
            highestTag = {
              id: tagIdNum,
              name: tagName,
              percentage: percentageNum
            };
            highestPercentage = percentageNum;
          }
        });

        // Determinar el nivel de estrés basado en el porcentaje
        let stressLevel = 'Bajo';
        let stressColor = '#666';
        let stressBg = '#e6f7e6';

        if (highestPercentage > 66) {
          stressLevel = 'Alto';
          stressColor = '#dc2626';
          stressBg = '#fef2f2';
        } else if (highestPercentage > 33) {
          stressLevel = 'Intermedio';
          stressColor = '#d97706';
          stressBg = '#fffbeb';
        }

        departmentTagsData[deptId] = {
          highestTag,
          stressLevel,
          stressColor,
          stressBg
        };
      });

      console.log('Datos procesados por departamento:', departmentTagsData);
      setDepartmentTags(departmentTagsData);

    } catch (error) {
      console.error('Error procesando AVERAGE_TAG_PER_DEPARTMENT:', error);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    console.log('useEffect ejecutado - user:', user);
    if (user) {
      fetchTotalEmployees();
      fetchEmployeesByDepartments();
      fetchAllMetrics();
    }
  }, [user]);

  // Cargar datos cuando el componente se monte (fallback)
  useEffect(() => {
    console.log('useEffect de montaje ejecutado');
    const timer = setTimeout(() => {
      if (user && user?.company?.companyId) {
        console.log('Ejecutando fetchTotalEmployees después del timeout');
        fetchTotalEmployees();
        fetchEmployeesByDepartments();
        fetchAllMetrics();
      }
    }, 1000); // Esperar 1 segundo para que el user esté disponible

    return () => clearTimeout(timer);
  }, []);

  // Función helper para obtener el número de empleados por departamento
  const getEmployeeCountByDepartment = (departmentName) => {
    return employeesByDepartment[departmentName] || 0;
  };

  // Función helper para obtener el porcentaje de empleados por departamento
  const getEmployeePercentageByDepartment = (departmentName) => {
    // Por el momento, siempre retornar 0 - se actualizará más tarde
    return 0;
  };

  // Función helper para obtener el icono del estado emocional
  const getEmotionalStateIcon = (iconType) => {
    switch (iconType) {
      case 'frown':
        return <Frown size={26} color={emotionalState.color} />;
      case 'meh':
        return <Meh size={26} color={emotionalState.color} />;
      case 'smile':
      default:
        return <Smile size={26} color={emotionalState.color} />;
    }
  };

  // Función helper para obtener los datos de un departamento específico
  const getDepartmentData = (departmentId) => {
    return departmentTags[departmentId] || {
      highestTag: null,
      stressLevel: 'Bajo',
      stressColor: '#666',
      stressBg: '#e6f7e6'
    };
  };

  // Función helper para obtener el nombre del departamento por ID
  const getDepartmentName = (departmentId) => {
    const departmentNames = {
      1: 'Ventas',
      2: 'Marketing',
      3: 'Tecnología',
      4: 'Recursos Humanos',
      5: 'Finanzas',
      6: 'Operaciones',
      7: 'Otros'
    };
    return departmentNames[departmentId] || 'Desconocido';
  };

  // Función helper para calcular el porcentaje de empleados por departamento
  const getEmployeeDistributionPercentage = (departmentName) => {
    const count = getEmployeeCountByDepartment(departmentName);
    const total = totalEmployees;
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      {/* Debug: Mostrar métricas obtenidas */}
      {loadingMetrics ? (
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: 8, 
          marginBottom: '1rem',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ color: '#6c757d', fontSize: 14 }}>Cargando métricas...</div>
        </div>
      ) : (
        <div style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: 8, 
          marginBottom: '1rem',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ color: '#495057', fontSize: 14, fontWeight: 600, marginBottom: '0.5rem' }}>
            Métricas Disponibles ({availableMetrics.length}):
          </div>
          <div style={{ color: '#6c757d', fontSize: 12, marginBottom: '0.5rem' }}>
            {availableMetrics.join(', ')}
          </div>
          <div style={{ color: '#495057', fontSize: 14, fontWeight: 600, marginBottom: '0.5rem' }}>
            Datos Obtenidos:
          </div>
          <pre style={{ 
            color: '#6c757d', 
            fontSize: 11, 
            background: '#fff', 
            padding: '0.5rem', 
            borderRadius: 4,
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(metricsData, null, 2)}
          </pre>
        </div>
      )}

      {/* Tarjetas de métricas principales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 18 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {getEmotionalStateIcon(emotionalState.icon)}
          <div style={{ color: emotionalState.color, fontWeight: 700, fontSize: 17 }}>
            {emotionalState.percentage.toFixed(1)}%
          </div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Estado Emocional General</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>
            {emotionalState.tag} - {emotionalState.percentage.toFixed(1)}% de usuarios
          </div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Users size={26} color="#ffb300" />
          <div style={{ color: '#ff7043', fontWeight: 800, fontSize: 17 }}>
            {loading ? '...' : totalEmployees}
          </div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Colaboradores Activos</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>de {loading ? '...' : totalEmployees} empleados</div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
      </div>

      {/* Segunda fila de métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 18, marginBottom: 18 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <AlertTriangle size={26} color="#ffb3b3" />
          <div style={{ color: '#ff5e5e', fontWeight: 800, fontSize: 17 }}>
            {stressTags.length}
          </div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Reportan Estrés</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>
            {stressTags.length > 0 ? (
              <div>
                {stressTags.map((tag, index) => (
                  <div key={index} style={{ fontSize: 11, marginBottom: 2 }}>
                    {tag.name}: {tag.percentage.toFixed(1)}%
                  </div>
                ))}
              </div>
            ) : (
              '0% de empleados activos'
            )}
          </div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
      </div>

      {/* Mapeo Emocional por Áreas */}
      <div style={{ display: 'flex', gap: 24, marginTop: 32, alignItems: 'flex-start' }}>
        {/* Columna principal: tarjetas de áreas */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ color: '#2050c7', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={20} style={{marginRight: 4}}/> Mapeo Emocional por Áreas
            </span>
          </div>
          
          {/* Tarjetas de áreas */}
          {[
            {
              id: 1,
              color: '#2ecc71',
              label: 'Ventas',
              empleados: getEmployeeCountByDepartment('Ventas'),
              porcentaje: getEmployeePercentageByDepartment('Ventas'),
            },
            {
              id: 2,
              color: '#2ecc71',
              label: 'Marketing',
              empleados: getEmployeeCountByDepartment('Marketing'),
              porcentaje: getEmployeePercentageByDepartment('Marketing'),
            },
            {
              id: 3,
              color: '#2ecc71',
              label: 'Tecnología',
              empleados: getEmployeeCountByDepartment('Tecnología'),
              porcentaje: getEmployeePercentageByDepartment('Tecnología'),
            },
            {
              id: 4,
              color: '#2ecc71',
              label: 'Recursos Humanos',
              empleados: getEmployeeCountByDepartment('Recursos Humanos'),
              porcentaje: getEmployeePercentageByDepartment('Recursos Humanos'),
            },
            {
              id: 5,
              color: '#2ecc71',
              label: 'Finanzas',
              empleados: getEmployeeCountByDepartment('Finanzas'),
              porcentaje: getEmployeePercentageByDepartment('Finanzas'),
            },
            {
              id: 6,
              color: '#2ecc71',
              label: 'Operaciones',
              empleados: getEmployeeCountByDepartment('Operaciones'),
              porcentaje: getEmployeePercentageByDepartment('Operaciones'),
            },
            {
              id: 7,
              color: '#2ecc71',
              label: 'Otros',
              empleados: getEmployeeCountByDepartment('Otros'),
              porcentaje: getEmployeePercentageByDepartment('Otros'),
            },
            {
              id: 0,
              color: '#ff6b6b',
              label: 'Sin departamento',
              empleados: getEmployeeCountByDepartment('Sin departamento'),
              porcentaje: getEmployeePercentageByDepartment('Sin departamento'),
            },
          ].map((area, index) => {
            // Obtener datos del departamento (solo para departamentos con ID válido)
            const deptData = area.id > 0 ? getDepartmentData(area.id) : null;
            
            return (
            <div key={index} style={{
              background: '#fff',
              borderRadius: 16,
              padding: '1.5rem',
              boxShadow: '0 2px 8px #e0e7ef',
              border: '1.5px solid #f2f2f2',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              {/* Indicador de color */}
              <div style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: area.color,
                flexShrink: 0
              }} />
              
              {/* Información del área */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 18 }}>{area.label}</span>
                  {deptData && (
                    <span style={{
                      background: deptData.stressBg,
                      color: deptData.stressColor,
                      padding: '0.3rem 0.8rem',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 700
                    }}>
                      {deptData.stressLevel}
                    </span>
                  )}
                </div>
                <div style={{ color: '#7a8bbd', fontSize: 14, marginBottom: 4 }}>
                  {area.empleados} empleados • {deptData && deptData.highestTag ? deptData.highestTag.percentage.toFixed(1) : 0}% reportan problemas
                </div>
                <div style={{ color: '#666', fontSize: 13, fontStyle: 'italic' }}>
                  {deptData && deptData.highestTag ? (
                    `${deptData.highestTag.percentage.toFixed(1)}% de empleados reportan ${deptData.highestTag.name.toLowerCase()}`
                  ) : (
                    `${area.empleados} empleados sin datos de diagnóstico`
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Columna lateral: distribución de empleados */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, padding: '2rem', boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2' }}>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>
            Distribución de Empleados
          </div>
          
          {[
            { dept: 'Ventas', value: getEmployeeDistributionPercentage('Ventas'), color: '#2ecc71' },
            { dept: 'Marketing', value: getEmployeeDistributionPercentage('Marketing'), color: '#2ecc71' },
            { dept: 'Tecnología', value: getEmployeeDistributionPercentage('Tecnología'), color: '#2ecc71' },
            { dept: 'RRHH', value: getEmployeeDistributionPercentage('Recursos Humanos'), color: '#2ecc71' },
            { dept: 'Finanzas', value: getEmployeeDistributionPercentage('Finanzas'), color: '#2ecc71' },
            { dept: 'Operaciones', value: getEmployeeDistributionPercentage('Operaciones'), color: '#2ecc71' },
            { dept: 'Otros', value: getEmployeeDistributionPercentage('Otros'), color: '#2ecc71' },
            { dept: 'Sin Depto', value: getEmployeeDistributionPercentage('Sin departamento'), color: '#ff6b6b' },
          ].map((item, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#222', fontWeight: 600, fontSize: 14 }}>{item.dept}</span>
                <span style={{ color: item.color, fontWeight: 700, fontSize: 14 }}>{item.value}%</span>
              </div>
              <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${item.value}%`,
                  height: '100%',
                  background: item.color,
                  borderRadius: 4
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardHome;
