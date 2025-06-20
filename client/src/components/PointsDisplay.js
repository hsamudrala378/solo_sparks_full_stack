import React from 'react';

export default function PointsDisplay({ points }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>✨ Spark Points: {points}</h3>
    </div>
  );
}
