import React from 'react';
import './App.css';
import ProjectSubmissionForm from './components/ProjectSubmissionForm';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Blockstarter</h1>
      <ProjectSubmissionForm />
    </div>
  );
}

export default App;