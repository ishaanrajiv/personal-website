import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const GitHubIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={size ? `w-${size} h-${size}` : className}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={size ? `w-${size} h-${size}` : className}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={size ? `w-${size} h-${size}` : className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

export const TestFlightIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={size ? `w-${size} h-${size}` : className}
    viewBox="0 0 24 24" 
    fill="none"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
    <path d="M7.5 6.5L12 17.5L16.5 6.5H14.5L12 13L9.5 6.5H7.5Z" fill="white"/>
  </svg>
);

export const AppStoreIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg 
    className={size ? `w-${size} h-${size}` : className}
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// Icon Link Components with hover effects and brand colors
interface IconLinkProps {
  href: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const IconLink: React.FC<IconLinkProps> = ({ 
  href, 
  title, 
  children, 
  className = "",
  external = false 
}) => (
  <a 
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={className}
    title={title}
  >
    {children}
  </a>
);

// Pre-configured icon links with brand-specific hover colors
export const GitHubLink: React.FC<{ 
  href: string; 
  size?: 'small' | 'medium' | 'large';
  style?: 'button' | 'icon';
}> = ({ href, size = 'medium', style = 'button' }) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const baseClasses = style === 'button' 
    ? "border border-accent text-primary hover:text-black px-3 py-2 rounded-xl hover:bg-border transition-colors"
    : "text-primary hover:text-black p-2 rounded hover:bg-border transition-colors";

  return (
    <IconLink 
      href={href} 
      title="View on GitHub" 
      className={baseClasses}
      external
    >
      <GitHubIcon className={sizeMap[size]} />
    </IconLink>
  );
};

export const LinkedInLink: React.FC<{ 
  href: string; 
  size?: 'small' | 'medium' | 'large';
  style?: 'button' | 'icon';
}> = ({ href, size = 'medium', style = 'button' }) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const baseClasses = style === 'button' 
    ? "border border-accent text-primary hover:text-blue-600 px-3 py-2 rounded-xl hover:bg-border transition-colors"
    : "text-primary hover:text-blue-600 p-2 rounded hover:bg-border transition-colors";

  return (
    <IconLink 
      href={href} 
      title="Connect on LinkedIn" 
      className={baseClasses}
      external
    >
      <LinkedInIcon className={sizeMap[size]} />
    </IconLink>
  );
};

export const EmailLink: React.FC<{ 
  email: string; 
  size?: 'small' | 'medium' | 'large';
  style?: 'button' | 'icon';
}> = ({ email, size = 'medium', style = 'button' }) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const baseClasses = style === 'button' 
    ? "border border-accent text-primary hover:text-gray-600 px-3 py-2 rounded-xl hover:bg-border transition-colors"
    : "text-primary hover:text-gray-600 p-2 rounded hover:bg-border transition-colors";

  return (
    <IconLink 
      href={`mailto:${email}`} 
      title="Send Email" 
      className={baseClasses}
    >
      <EmailIcon className={sizeMap[size]} />
    </IconLink>
  );
};

export const TestFlightLink: React.FC<{ 
  href: string; 
  size?: 'small' | 'medium' | 'large';
  style?: 'button' | 'icon';
}> = ({ href, size = 'medium', style = 'button' }) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const baseClasses = style === 'button' 
    ? "border border-accent text-primary hover:text-blue-500 px-3 py-2 rounded-xl hover:bg-border transition-colors"
    : "text-primary hover:text-blue-500 p-2 rounded hover:bg-border transition-colors";

  return (
    <IconLink 
      href={href} 
      title="Download TestFlight" 
      className={baseClasses}
      external
    >
      <TestFlightIcon className={sizeMap[size]} />
    </IconLink>
  );
};

export const AppStoreLink: React.FC<{ 
  href: string; 
  size?: 'small' | 'medium' | 'large';
  style?: 'button' | 'icon';
}> = ({ href, size = 'medium', style = 'button' }) => {
  const sizeMap = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const baseClasses = style === 'button' 
    ? "border border-accent text-primary hover:text-black px-3 py-2 rounded-xl hover:bg-border transition-colors"
    : "text-primary hover:text-black p-2 rounded hover:bg-border transition-colors";

  return (
    <IconLink 
      href={href} 
      title="Download from App Store" 
      className={baseClasses}
      external
    >
      <AppStoreIcon className={sizeMap[size]} />
    </IconLink>
  );
};