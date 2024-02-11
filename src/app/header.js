import React from 'react';

const styles = {
  logo: {
    marginRight: '16px',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  navigation: {
    marginLeft: 'auto',
  },
  appBar: {
    position: 'static',
    color: 'white',
    backgroundColor: '#3f51b5',
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  menuButton: {
    color: 'inherit',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    marginRight: '16px',
  },
};

function Header() {
  return (
    <header style={styles.appBar}>
      <div style={styles.toolbar}>
        <button style={styles.menuButton} aria-label="menu">
          ☰
        </button>
        <h1 style={styles.title}>
          Website Name
        </h1>
        <div style={styles.navigation}>
          {/* Add your navigation links here */}
        </div>
      </div>
    </header>
  );
}

export default Header;