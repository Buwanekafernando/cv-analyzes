
import React from 'react';

export const RobotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
    <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"></path>
    <path d="M12 17v-4"></path>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M7 12h-1"></path>
    <path d="M18 12h-1"></path>
  </svg>
);
