import React from 'react';

const MobileDashboardNav = ({ items, activeSection, onSectionChange }) => {
  return (
            <div className="mobile-nav-tabs visible-mobile" style={{ display: 'none', marginBottom: '1rem' }}>
      {items.map((item) => (
        <button
          key={item.section}
          className={`mobile-nav-tab ${activeSection === item.section ? 'active' : ''}`}
          onClick={() => onSectionChange(item.section)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: activeSection === item.section ? '#0057FF' : '#f8f9fa',
            color: activeSection === item.section ? '#fff' : '#333',
            border: `1px solid ${activeSection === item.section ? '#0057FF' : '#e0e7ef'}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileDashboardNav; 