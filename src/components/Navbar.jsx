import React, { useState } from 'react';

const navLinks = [
  { label: 'Psicólogos', page: 'psychologists' },
  { label: 'Empresas', page: 'business' },
  { label: 'Acerca de', page: 'about-us' },
  { label: 'Precios', page: 'pricing' },
];

const Navbar = ({ navigationProps }) => {
  const [hovered, setHovered] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
    setMobileMenuOpen(false); // Cerrar menú móvil al navegar
  };

  const handleLogoClick = () => {
    handleNavigation('individuals');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav style={{ background: '#0057FF', color: '#fff', padding: '1.2rem 0', transition: 'box-shadow 0.2s' }}>
      <div className="container navbar-container" style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo y nombre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <span
            className="navbar-logo"
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              letterSpacing: 1,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onClick={handleLogoClick}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Empathica
          </span>
        </div>

        {/* Botón hamburguesa para móviles */}
        <button
          className="visible-mobile"
          onClick={toggleMobileMenu}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 24,
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none'
          }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Enlaces de navegación - Desktop */}
        <ul className="navbar-links hidden-mobile" style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: 18, fontWeight: 500 }}>
          {navLinks.map((link, i) => (
            <li key={i}>
              <button
                onClick={() => handleNavigation(link.page)}
                style={{
                  color: hovered === i ? '#AEE2FF' : '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  transform: hovered === i ? 'scale(1.13)' : 'scale(1)',
                  fontWeight: hovered === i ? 700 : 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Botones - Desktop */}
        <div className="navbar-buttons hidden-mobile" style={{ display: 'flex', gap: '1.2rem' }}>
          <button
            className="btn-primary"
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
              transition: 'transform 0.18s, box-shadow 0.18s',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.09)';
              e.currentTarget.style.boxShadow = '0 2px 12px #0057ff44';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Iniciar sesión
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleNavigation('register')}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              borderRadius: 20,
              padding: '0.7rem 1.5rem',
              fontWeight: 500,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'transform 0.18s, box-shadow 0.18s',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.09)';
              e.currentTarget.style.boxShadow = '0 2px 12px #fff4';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Registrarse
          </button>
      </div>
    </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu" style={{
          background: '#0057FF',
          padding: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'none'
        }}>
          {/* Enlaces móviles */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 18, fontWeight: 500 }}>
            {navLinks.map((link, i) => (
              <li key={i} style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleNavigation(link.page)}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.8rem 0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Botones móviles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <button
              className="btn-primary"
              onClick={() => handleNavigation('login')}
              style={{
                background: '#fff',
                color: '#0057FF',
                border: 'none',
                borderRadius: 20,
                padding: '0.8rem 1rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Iniciar sesión
            </button>
            <button
              className="btn-secondary"
              onClick={() => handleNavigation('register')}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: 20,
                padding: '0.8rem 1rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
  </nav>
);
};

export default Navbar; 