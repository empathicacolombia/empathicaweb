import React from 'react';

const columns = [
  {
    title: 'Para usuarios',
    links: ['Hacer el test', 'Encontrar psicólogo', 'Sesión orientativa'],
  },
  {
    title: 'Para profesionales',
    links: ['Únete a Empathica', 'Portal profesional', 'Capacitaciones'],
  },
  {
    title: 'Para empresas',
    links: ['Dashboard empresarial', 'Ver demo', 'Planes corporativos'],
  },
  {
    title: 'Para soporte',
    links: ['Centro de ayuda', 'Contacto', 'Privacidad'],
  },
];

const Footer = () => (
  <footer style={{ background: '#232733', color: '#fff', position: 'relative', padding: '4.5rem 0 2.5rem 0', overflow: 'hidden' }}>
    {/* Círculos decorativos */}
    <div style={{ position: 'absolute', left: 40, top: 40, width: 130, height: 130, borderRadius: '50%', background: '#1a2040', opacity: 0.5, zIndex: 1 }} />
    <div style={{ position: 'absolute', right: 40, bottom: 40, width: 130, height: 130, borderRadius: '50%', background: '#2a2328', opacity: 0.3, zIndex: 1 }} />
    <div className="container footer-container" style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#7c8fd6', marginBottom: 10 }}>Empathica</div>
      <div style={{ color: '#bfc3d9', fontSize: 18, marginBottom: 38 }}>
        Conectando corazones con mentes expertas. Tu bienestar emocional es nuestra prioridad.
      </div>
      <div className="footer-sections" style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginBottom: 38, flexWrap: 'wrap' }}>
        {columns.map((col, i) => (
          <div key={i} className="footer-section" style={{ minWidth: 180 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#fff' }}>{col.title}</div>
            {col.links.map((link, j) => (
              <div key={j} style={{ color: '#bfc3d9', fontSize: 16, marginBottom: 10, textAlign: 'center', cursor: 'pointer' }}>{link}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #444857', margin: '2.5rem 0 1.5rem 0' }} />
      <div style={{ color: '#bfc3d9', fontSize: 16, marginTop: 18 }}>
        © 2024 Empathica. Todos los derechos reservados. Hecho con <span style={{ color: '#ff6f91', fontSize: 18 }}>❤</span> para tu bienestar emocional.
      </div>
    </div>
  </footer>
);

export default Footer; 