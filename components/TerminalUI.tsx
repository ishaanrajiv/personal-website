'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   BLINKING CURSOR
   ═══════════════════════════════════════════════════════════════════════════ */

interface CursorProps {
  variant?: 'green' | 'amber';
  className?: string;
}

export const BlinkingCursor: React.FC<CursorProps> = ({
  variant = 'green',
  className = ''
}) => {
  const cursorClass = variant === 'amber' ? 'cursor-blink cursor-blink-amber' : 'cursor-blink';
  return <span className={`${cursorClass} ${className}`} aria-hidden="true" />;
};

/* ═══════════════════════════════════════════════════════════════════════════
   TYPING TEXT ANIMATION
   ═══════════════════════════════════════════════════════════════════════════ */

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorVariant?: 'green' | 'amber';
  className?: string;
  onComplete?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  showCursor = true,
  cursorVariant = 'green',
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (isTyping || isComplete) && <BlinkingCursor variant={cursorVariant} />}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMMAND PROMPT
   ═══════════════════════════════════════════════════════════════════════════ */

interface CommandPromptProps {
  user?: string;
  path?: string;
  command?: string;
  showCursor?: boolean;
  className?: string;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({
  user = 'visitor',
  path = '~',
  command = '',
  showCursor = true,
  className = ''
}) => {
  return (
    <div className={`font-mono ${className}`}>
      <span className="prompt-user">{user}</span>
      <span className="prompt-separator">@</span>
      <span className="text-text-secondary">terminal</span>
      <span className="prompt-separator">:</span>
      <span className="prompt-path">{path}</span>
      <span className="prompt-symbol"> $ </span>
      <span className="text-text-primary">{command}</span>
      {showCursor && <BlinkingCursor />}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   TERMINAL WINDOW
   ═══════════════════════════════════════════════════════════════════════════ */

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'terminal',
  children,
  className = ''
}) => {
  return (
    <div className={`code-block ${className}`}>
      <div className="terminal-dots">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-4 text-text-muted text-sm">{title}</span>
      </div>
      <div className="pt-4 relative z-10">
        {children}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════════════════ */

interface SectionHeaderProps {
  title: string;
  comment?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  comment,
  className = ''
}) => {
  return (
    <div className={`section-header ${className}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
        {title}
      </h2>
      {comment && (
        <span className="text-syntax-comment text-sm hidden sm:inline">
          {comment}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   ASCII ART NAME
   ═══════════════════════════════════════════════════════════════════════════ */

export const ASCIIName: React.FC<{ className?: string }> = ({ className = '' }) => {
  const art = `
 ██╗███████╗██╗  ██╗ █████╗  █████╗ ███╗   ██╗
 ██║██╔════╝██║  ██║██╔══██╗██╔══██╗████╗  ██║
 ██║███████╗███████║███████║███████║██╔██╗ ██║
 ██║╚════██║██╔══██║██╔══██║██╔══██║██║╚██╗██║
 ██║███████║██║  ██║██║  ██║██║  ██║██║ ╚████║
 ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`;

  return (
    <pre className={`ascii-art text-phosphor flicker ${className}`} aria-label="Ishaan">
      {art}
    </pre>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   OUTPUT LINE
   ═══════════════════════════════════════════════════════════════════════════ */

interface OutputLineProps {
  prefix?: string;
  prefixColor?: 'green' | 'amber' | 'cyan' | 'magenta' | 'yellow';
  children: React.ReactNode;
  className?: string;
}

export const OutputLine: React.FC<OutputLineProps> = ({
  prefix,
  prefixColor = 'green',
  children,
  className = ''
}) => {
  const colorMap = {
    green: 'text-phosphor',
    amber: 'text-amber',
    cyan: 'text-syntax-cyan',
    magenta: 'text-syntax-magenta',
    yellow: 'text-syntax-yellow'
  };

  return (
    <div className={`font-mono leading-relaxed ${className}`}>
      {prefix && (
        <span className={`${colorMap[prefixColor]} mr-2`}>{prefix}</span>
      )}
      <span className="text-text-primary">{children}</span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   TERMINAL CARD
   ═══════════════════════════════════════════════════════════════════════════ */

interface TerminalCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({
  children,
  className = '',
  hoverEffect = true
}) => {
  return (
    <div className={`terminal-card p-6 ${hoverEffect ? '' : ''} ${className}`}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   SKILL TAG
   ═══════════════════════════════════════════════════════════════════════════ */

interface SkillTagProps {
  skill: string;
  active?: boolean;
  className?: string;
}

export const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  active = false,
  className = ''
}) => {
  return (
    <span className={`terminal-tag ${active ? 'terminal-tag-active' : ''} ${className}`}>
      {skill}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   TIMELINE ENTRY
   ═══════════════════════════════════════════════════════════════════════════ */

interface TimelineEntryProps {
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  isActive?: boolean;
  className?: string;
}

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  date,
  title,
  subtitle,
  description,
  isActive = false,
  className = ''
}) => {
  return (
    <div className={`relative pl-8 pb-8 border-l ${isActive ? 'border-phosphor' : 'border-border'} ${className}`}>
      {/* Timeline dot */}
      <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${
        isActive
          ? 'bg-phosphor shadow-[0_0_10px_var(--phosphor-green)]'
          : 'bg-border'
      }`} />

      {/* Content */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
          <h4 className={`font-semibold ${isActive ? 'text-phosphor' : 'text-text-primary'}`}>
            {title}
          </h4>
          <span className="text-amber text-sm font-mono">{date}</span>
        </div>
        {subtitle && (
          <p className="text-text-secondary text-sm">{subtitle}</p>
        )}
        {description && (
          <p className="text-text-muted text-sm mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   BOOT SEQUENCE ANIMATION
   ═══════════════════════════════════════════════════════════════════════════ */

interface BootSequenceProps {
  onComplete?: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const bootLines = [
    '[BOOT] Initializing system...',
    '[OK] Loading kernel modules',
    '[OK] Mounting filesystem',
    '[OK] Starting network services',
    '[OK] Portfolio v2.0.0 loaded',
    '[READY] Welcome, visitor_'
  ];

  useEffect(() => {
    let lineIndex = 0;

    const addLine = () => {
      if (lineIndex < bootLines.length) {
        setLines(prev => [...prev, bootLines[lineIndex]]);
        lineIndex++;
        setTimeout(addLine, 150 + Math.random() * 100);
      } else {
        setIsComplete(true);
        setTimeout(() => onComplete?.(), 500);
      }
    };

    const timeout = setTimeout(addLine, 300);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="font-mono text-sm space-y-1">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`${
            line.includes('[OK]') ? 'text-phosphor' :
            line.includes('[READY]') ? 'text-amber' :
            'text-text-secondary'
          }`}
        >
          {line}
          {i === lines.length - 1 && !isComplete && <BlinkingCursor />}
        </div>
      ))}
    </div>
  );
};
