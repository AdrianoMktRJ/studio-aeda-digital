import { Link } from "wouter";
import { Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Construtoras", path: "/construtoras" },
    { label: "Advogados", path: "/advogados" },
    { label: "Sobre", path: "/sobre" },
    { label: "Serviços", path: "/servicos" },
    { label: "Contato", path: "/contato" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/studioaedadigital/" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/studio-aeda-digital" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61578330103145" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center p-1">
                <img src="/logo-aeda-transparent.png" alt="AEDA Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="text-lg font-bold text-[#1e3a8a] leading-none">Studio AEDA Digital</span>
                <span className="text-xs text-gray-400 leading-none mt-1">Intelligent management with AI</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Transformamos tecnologia em clareza: simplificamos processos, aumentamos produtividade 
              e geramos crescimento por meio de IA, automação e dados.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-[#1e3a8a] flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button className="text-gray-400 hover:text-white text-left transition-colors">
                    {item.label}
                  </button>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">E-mail</p>
                <a
                  href="mailto:s.aedadigital@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  s.aedadigital@gmail.com
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/5583993751326"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +55 (83) 99375-1326
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Horário</p>
                <p className="text-gray-300">Seg-Sex: 9h às 18h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© 2025 Studio AEDA Digital. Todos os direitos reservados.</p>
          <Link href="/privacidade">
            <button className="text-gray-400 hover:text-white transition-colors mt-2">
              Política de Privacidade e LGPD
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
}

