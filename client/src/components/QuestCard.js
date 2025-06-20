import React from 'react';

export default function QuestCard({ quest, onComplete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
      <h4>{quest.title}</h4>
      <p>{quest.description}</p>
      <p>Status: {quest.completed ? '✅ Completed' : '🕒 Pending'}</p>
      {!quest.completed && (
        <button onClick={() => onComplete(quest._id)}>Mark as Complete</button>
      )}
    </div>
  );
}
