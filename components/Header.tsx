
import React from 'react';
import { RobotIcon } from './icons/RobotIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-ats-secondary shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <RobotIcon className="w-8 h-8 text-white" />
        <h1 className="ml-3 text-2xl font-bold text-white tracking-tight">
          AI CV Analyzer
        </h1>
      </div>
    </header>
  );
};

export default Header;
