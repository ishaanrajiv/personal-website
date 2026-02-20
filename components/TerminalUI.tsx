'use client';

import React, { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   BLINKING CURSOR
   ═══════════════════════════════════════════════════════════════════════════ */

interface CursorProps {
  variant?: 'cyan' | 'amber';
  className?: string;
}

export const BlinkingCursor: React.FC<CursorProps> = ({
  variant = 'cyan',
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
  cursorVariant?: 'cyan' | 'amber';
  className?: string;
  onComplete?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  showCursor = true,
  cursorVariant = 'cyan',
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
        <span className="ml-3 sm:ml-4 text-text-muted text-xs sm:text-sm">{title}</span>
      </div>
      <div className="pt-3 sm:pt-4 relative z-10">
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
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary">
        {title}
      </h2>
      {comment && (
        <span className="text-syntax-comment text-xs sm:text-sm hidden sm:inline">
          {comment}
        </span>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   ASCII ART NAME - Clean block style
   ═══════════════════════════════════════════════════════════════════════════ */

export const ASCIIName: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Clean ASCII art for "Ishaan Rajiv"
  const art = `
  ___     _                         ____        _ _
 |_ _|___| |__   __ _  __ _ _ __   |  _ \\ __ _ (_|_)_   __
  | |/ __| '_ \\ / _\` |/ _\` | '_ \\  | |_) / _\` || | \\ \\ / /
  | |\\__ \\ | | | (_| | (_| | | | | |  _ < (_| || | |\\ V /
 |___|___/_| |_|\\__,_|\\__,_|_| |_| |_| \\_\\__,_|/ |_| \\_/
                                             |__/`;

  return (
    <pre className={`ascii-art text-accent flicker ${className}`} aria-label="Ishaan">
      {art}
    </pre>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   OUTPUT LINE
   ═══════════════════════════════════════════════════════════════════════════ */

interface OutputLineProps {
  prefix?: string;
  prefixColor?: 'cyan' | 'amber' | 'magenta' | 'yellow';
  children: React.ReactNode;
  className?: string;
}

export const OutputLine: React.FC<OutputLineProps> = ({
  prefix,
  prefixColor = 'cyan',
  children,
  className = ''
}) => {
  const colorMap = {
    cyan: 'text-accent',
    amber: 'text-amber',
    magenta: 'text-syntax-magenta',
    yellow: 'text-syntax-yellow'
  };

  return (
    <div className={`font-mono text-sm sm:text-base leading-relaxed ${className}`}>
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
    <div className={`terminal-card p-4 sm:p-6 ${hoverEffect ? '' : ''} ${className}`}>
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
    <div className={`relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l ${isActive ? 'border-accent' : 'border-border'} ${className}`}>
      {/* Timeline dot */}
      <div className={`absolute left-[-4px] sm:left-[-5px] top-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isActive
          ? 'bg-accent shadow-[0_0_8px_var(--accent-glow)]'
          : 'bg-border'
        }`} />

      {/* Content */}
      <div className="space-y-0.5 sm:space-y-1">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-1 sm:gap-3">
          <h4 className={`text-sm sm:text-base font-semibold ${isActive ? 'text-accent' : 'text-text-primary'}`}>
            {title}
          </h4>
          <span className="text-amber text-xs sm:text-sm font-mono">{date}</span>
        </div>
        {subtitle && (
          <p className="text-text-secondary text-xs sm:text-sm">{subtitle}</p>
        )}
        {description && (
          <p className="text-text-muted text-xs sm:text-sm mt-1 sm:mt-2">{description}</p>
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
    <div className="font-mono text-xs sm:text-sm space-y-1">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`${line.includes('[OK]') ? 'text-accent' :
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
