
import React from 'react';
import StudyMaterialsBrowser from '@/components/study/StudyMaterialsBrowser';

const Study = () => {
  return (
    <div className="container max-w-6xl py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Study Materials</h1>
      <div className="glass-card rounded-lg shadow-card overflow-hidden">
        <StudyMaterialsBrowser />
      </div>
    </div>
  );
};

export default Study;
