'use client';

import React from 'react';

const styles = {
  footer: {
    backgroundColor: '#f5f5f5',
    padding: '48px',
    textAlign: 'center',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            footer
      </div>
    </footer>
  );
}

export default Footer;