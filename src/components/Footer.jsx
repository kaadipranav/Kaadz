import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/kaadipranav' },
    { icon: Twitter, label: 'Twitter/X', href: 'https://x.com/kaad_zz' },
    { icon: Mail, label: 'Email', href: 'mailto:kiwi092020@gmail.com' },
  ];

  return (
    <footer className="relative z-10 border-t border-gray-800/50 bg-bg-primary/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">
              <span className="text-watchllm-purple">kaadz</span>
            </h3>
            <p className="text-sm text-gray-400">
              Building tools that stop LLMs from breaking production
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-bg-secondary/50 hover:bg-bg-secondary text-gray-400 hover:text-watchllm-purple border border-gray-700/50 hover:border-watchllm-purple/50 rounded-lg transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} kaadz. Built with focus, shipped with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
