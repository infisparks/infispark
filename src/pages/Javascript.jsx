import React, { useState } from 'react';

// Sidebar Component for switching between visualizers
function Sidebar({ selected, onSelect }) {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Visualizer</h2>
      <button
        onClick={() => onSelect('const')}
        style={{
          display: 'block',
          margin: '0.5rem 0',
          padding: '0.5rem 1rem',
          backgroundColor: selected === 'const' ? '#4F46E5' : '#E5E7EB',
          color: selected === 'const' ? 'white' : 'black',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Const and getElementById Visualizer
      </button>
    </div>
  );
}

// Const and getElementById Visualizer Page
function ConstGetElementVisualizer() {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState(''); // Store the value captured by const
  const [animate, setAnimate] = useState(false);

  // Function to update the display value when input changes
  const updateValue = () => {
    setDisplayValue(inputValue); // Simulating const capturing value from the input
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 100); // Trigger animation
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>JavaScript: const, getElementById(), and .value</h1>
      <p>
        This example shows how we can use <code>const</code>, <code>document.getElementById()</code>, and the <code>.value</code> property to
        capture the value typed into an input field.
      </p>

      {/* Input Field to get value */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Enter Name:</label>
        <input
          id="name"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
          style={{ marginRight: '1rem' }}
        />
        <button
          onClick={updateValue}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Update
        </button>
      </div>

      {/* Explanation Box (for user clarity) */}
      <div style={{ padding: '1rem', border: '1px solid #4F46E5', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3>What is happening?</h3>
        <p>
          1. You type a value in the input field above.<br />
          2. When you click "Update", the value you typed is captured by <code>const name = document.getElementById("name").value;</code>.<br />
          3. The value is displayed below in real-time.
        </p>
      </div>

      {/* Display Box (showing captured value) */}
      <div
        style={{
          border: '2px solid #4F46E5',
          borderRadius: '8px',
          padding: '1rem',
          width: '250px',
          marginTop: '1rem',
          transition: 'transform 0.5s ease, opacity 0.5s ease',
          transform: animate ? 'scale(1)' : 'scale(0.8)',
          opacity: animate ? 1 : 0,
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Captured Value:</h3>
        <p style={{ margin: 0, fontFamily: 'monospace' }}>{displayValue || 'Nothing yet...'}</p>
      </div>
    </div>
  );
}

// Main Visualizer Page with Sidebar Navigation
function VisualizerPage() {
  const [selected, setSelected] = useState('const');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar selected={selected} onSelect={setSelected} />
      <div style={{ flex: 1 }}>
        {selected === 'const' && <ConstGetElementVisualizer />}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return <VisualizerPage />;
}

export default App;
