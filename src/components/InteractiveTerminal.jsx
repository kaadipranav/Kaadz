import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2 } from 'lucide-react';

const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'KAADZ TERMINAL v1.0.0' },
    { type: 'system', text: 'Type "help" for available commands.' },
    { type: 'system', text: '─────────────────────────────────' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => [
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  help       - Show this help message' },
        { type: 'output', text: '  about      - About kaadz' },
        { type: 'output', text: '  projects   - List all projects' },
        { type: 'output', text: '  skills     - View tech stack' },
        { type: 'output', text: '  contact    - Contact information' },
        { type: 'output', text: '  socials    - Social media links' },
        { type: 'output', text: '  ascii      - Show ASCII art' },
        { type: 'output', text: '  matrix     - Toggle matrix mode' },
        { type: 'output', text: '  hack       - Try to hack the system' },
        { type: 'output', text: '  clear      - Clear terminal' },
        { type: 'output', text: '  exit       - Close terminal' },
      ],
    },
    about: {
      description: 'About kaadz',
      execute: () => [
        { type: 'output', text: '╔════════════════════════════════════════╗' },
        { type: 'output', text: '║           KAADZ - SOLO FOUNDER         ║' },
        { type: 'output', text: '╠════════════════════════════════════════╣' },
        { type: 'output', text: '║  Building AI-powered apps at 3AM      ║' },
        { type: 'output', text: '║  TypeScript demon · Shipping fast     ║' },
        { type: 'output', text: '║  Founder: AuthorStack, ScriptBoost    ║' },
        { type: 'output', text: '║  8+ apps deployed and counting        ║' },
        { type: 'output', text: '╚════════════════════════════════════════╝' },
      ],
    },
    projects: {
      description: 'List all projects',
      execute: () => [
        { type: 'output', text: '📦 PROJECTS' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'success', text: '✓ AuthorStack - Platform for indie authors' },
        { type: 'output', text: '  └─ authorstack.vercel.app' },
        { type: 'success', text: '✓ ScriptBoost - AI script generator' },
        { type: 'output', text: '  └─ scriptboost.vercel.app' },
        { type: 'success', text: '✓ BookHunt - Book discovery platform' },
        { type: 'success', text: '✓ 5+ more apps in production' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'output', text: 'Total: 8+ apps shipped 🚀' },
      ],
    },
    skills: {
      description: 'View tech stack',
      execute: () => [
        { type: 'output', text: '🛠️  TECH STACK' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'success', text: 'TypeScript ████████████████ 95%' },
        { type: 'success', text: 'React/Next ████████████████ 95%' },
        { type: 'success', text: 'Node.js    ██████████████░░ 85%' },
        { type: 'success', text: 'AI/ML      █████████████░░░ 80%' },
        { type: 'success', text: 'Python     ████████████░░░░ 75%' },
        { type: 'success', text: 'Databases  █████████████░░░ 80%' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'output', text: 'Primary: TypeScript + AI everything' },
      ],
    },
    contact: {
      description: 'Contact information',
      execute: () => [
        { type: 'output', text: '📬 CONTACT' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'output', text: '  Twitter/X: @kaad_zz' },
        { type: 'output', text: '  Instagram: @k.aadz' },
        { type: 'output', text: '  GitHub:    @kaadipranav' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'system', text: 'DMs are open! Let\'s build something.' },
      ],
    },
    socials: {
      description: 'Social media links',
      execute: () => [
        { type: 'output', text: '🔗 SOCIAL LINKS' },
        { type: 'output', text: '─────────────────────────────────' },
        { type: 'link', text: '  [1] Instagram → instagram.com/k.aadz', url: 'https://instagram.com/k.aadz' },
        { type: 'link', text: '  [2] X/Twitter → x.com/kaad_zz', url: 'https://x.com/kaad_zz' },
        { type: 'link', text: '  [3] GitHub   → github.com/kaadipranav', url: 'https://github.com/kaadipranav' },
        { type: 'output', text: '─────────────────────────────────' },
      ],
    },
    ascii: {
      description: 'Show ASCII art',
      execute: () => [
        { type: 'ascii', text: '' },
        { type: 'ascii', text: '    ██╗  ██╗ █████╗  █████╗ ██████╗ ███████╗' },
        { type: 'ascii', text: '    ██║ ██╔╝██╔══██╗██╔══██╗██╔══██╗╚══███╔╝' },
        { type: 'ascii', text: '    █████╔╝ ███████║███████║██║  ██║  ███╔╝ ' },
        { type: 'ascii', text: '    ██╔═██╗ ██╔══██║██╔══██║██║  ██║ ███╔╝  ' },
        { type: 'ascii', text: '    ██║  ██╗██║  ██║██║  ██║██████╔╝███████╗' },
        { type: 'ascii', text: '    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝' },
        { type: 'ascii', text: '' },
        { type: 'ascii', text: '           < SHIPPING CODE DAILY >' },
        { type: 'ascii', text: '' },
      ],
    },
    matrix: {
      description: 'Toggle matrix mode',
      execute: () => {
        document.body.classList.toggle('matrix-mode');
        return [
          { type: 'success', text: '> Matrix mode toggled' },
          { type: 'system', text: 'You are now seeing the code...' },
        ];
      },
    },
    hack: {
      description: 'Try to hack the system',
      execute: () => [
        { type: 'error', text: '> Initiating hack sequence...' },
        { type: 'output', text: '> Bypassing firewall...' },
        { type: 'output', text: '> Accessing mainframe...' },
        { type: 'output', text: '> Decrypting data...' },
        { type: 'error', text: '> ACCESS DENIED' },
        { type: 'system', text: '' },
        { type: 'system', text: '  Nice try! But you\'re already in.' },
        { type: 'system', text: '  Welcome to the club. 😎' },
      ],
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([
          { type: 'system', text: 'KAADZ TERMINAL v1.0.0' },
          { type: 'system', text: 'Type "help" for available commands.' },
          { type: 'system', text: '─────────────────────────────────' },
        ]);
        return [];
      },
    },
    exit: {
      description: 'Close terminal',
      execute: () => {
        setTimeout(() => setIsOpen(false), 300);
        return [{ type: 'system', text: 'Goodbye! 👋' }];
      },
    },
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `$ ${cmd}` }];

    if (trimmedCmd === '') {
      setHistory(newHistory);
      return;
    }

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd].execute();
      setHistory([...newHistory, ...output]);
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `Command not found: ${trimmedCmd}` },
        { type: 'output', text: 'Type "help" for available commands.' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const getLineColor = (type) => {
    switch (type) {
      case 'input': return 'text-cyan-400';
      case 'output': return 'text-matrix-green/80';
      case 'success': return 'text-matrix-green';
      case 'error': return 'text-red-400';
      case 'system': return 'text-yellow-400/80';
      case 'ascii': return 'text-matrix-green';
      case 'link': return 'text-cyan-400 hover:underline cursor-pointer';
      default: return 'text-matrix-green/70';
    }
  };

  return (
    <>
      {/* Terminal toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-cyber-black/90 border border-matrix-green/50
                   hover:border-matrix-green hover:bg-matrix-green/10 transition-all duration-300
                   backdrop-blur-sm group ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        aria-label="Open Terminal"
      >
        <Terminal className="text-matrix-green group-hover:text-white transition-colors" size={24} />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-matrix-green rounded-full animate-pulse" />
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '400px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[90vw] max-w-lg z-50 rounded-xl overflow-hidden
                      bg-cyber-black/95 border border-matrix-green/50 backdrop-blur-md
                      shadow-2xl shadow-matrix-green/20"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-cyber-black border-b border-matrix-green/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  />
                  <button 
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-matrix-green" />
                </div>
                <span className="text-matrix-green/80 text-sm font-mono">kaadz@terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-matrix-green/10 rounded transition-colors"
                >
                  <Minimize2 size={14} className="text-matrix-green/60" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-red-500/20 rounded transition-colors"
                >
                  <X size={14} className="text-matrix-green/60 hover:text-red-400" />
                </button>
              </div>
            </div>

            {/* Terminal body */}
            {!isMinimized && (
              <div 
                ref={terminalRef}
                className="h-[320px] overflow-y-auto p-4 font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                {/* History */}
                {history.map((line, index) => (
                  <div 
                    key={index} 
                    className={`${getLineColor(line.type)} leading-relaxed`}
                    onClick={() => line.url && window.open(line.url, '_blank')}
                  >
                    {line.text}
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center mt-2">
                  <span className="text-cyan-400">$&nbsp;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-matrix-green caret-matrix-green"
                    autoFocus
                    spellCheck={false}
                  />
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-matrix-green"
                  >
                    █
                  </motion.span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveTerminal;
