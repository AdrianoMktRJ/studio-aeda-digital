import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);


  const navItems = [
    { label: "Home", path: "/" },
    { label: "Construtoras", path: "/construtoras" },
    { label: "Advogados", path: "/advogados" },
    { label: "Sobre", path: "/sobre" },
    { label: "Serviços", path: "/servicos" },
    { label: "Contato", path: "/contato" },
  ];

  const languages = [
    { code: "pt", label: "🇧🇷 PT", active: true },
    { code: "en", label: "🇺🇸 EN", active: false },
    { code: "es", label: "🇪🇸 ES", active: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center p-1">
                <img src="/logo-aeda-transparent.png" alt="AEDA Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center items-start">
                <span className="text-xl font-bold text-[#1e3a8a] leading-none">Studio AEDA Digital</span>
                <span className="text-xs text-[#a6a6a6] leading-none mt-1">Gestão inteligente com IA</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    location === item.path
                      ? "text-[#1e3a8a] bg-[#1e3a8a]/10"
                      : "text-gray-700 hover:text-[#1e3a8a] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">PT</span>
              </button>
              
              {languageMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        lang.active ? "text-[#1e3a8a] font-medium" : "text-gray-700"
                      }`}
                      onClick={() => setLanguageMenuOpen(false)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>



            <Button 
              className="bg-[#f97316] hover:bg-[#b86105] text-white font-semibold px-8 py-6 rounded-lg shadow-md transition-all"
              asChild
            >
              <Link href="/diagnostico">Diagnóstico Gratuito</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      location === item.path
                        ? "text-[#1e3a8a] bg-[#1e3a8a]/10"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
              
              <div className="flex gap-2 px-4 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`px-3 py-1 rounded text-sm ${
                      lang.active
                        ? "bg-[#1e3a8a] text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <Button 
                className="bg-[#f97316] hover:bg-[#b86105] text-white font-semibold mx-4 mt-2 py-6"
                asChild
              >
                <Link href="/diagnostico">Diagnóstico Gratuito</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

