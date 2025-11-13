
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Zap, Target, TrendingUp, Users, Brain, ArrowRight, Building2, Scale, X, Check, Clock, BarChart3, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import "../animations.css";
import "../visual-integration.css";

export default function Home() {

  const benefits = [
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Elimine tarefas repetitivas e libere tempo para decisões estratégicas",
      image: "/images/beneficio-automacao-real-v2.png"
    },
    {
      icon: TrendingUp,
      title: "Aumento de Produtividade",
      description: "Estudos mostram que a automação pode reduzir tarefas repetitivas significativamente",
      image: "/images/beneficio-produtividade-real.png"
    },
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Tecnologia de ponta adaptada ao seu negócio",
      image: "/images/beneficio-ia-real.png"
    },
  ];

  const services = [
    {
      title: "Mentoria IA na Prática",
      description: "Aprenda a implementar IA no seu negócio com suporte personalizado",
      features: [
        "Sessões semanais 1:1",
        "Diagnóstico inicial",
        "Plano de ação customizado",
        "Suporte por email",
      ],
      cta: "Começar Mentoria",
      highlight: false,
    },
    {
      title: "Consultoria AEDA Performance",
      description: "Implementação completa de automação e IA no seu processo",
      features: [
        "Análise profunda do negócio",
        "Implementação de automações",
        "Treinamento da equipe",
        "Suporte pós-implementação",
      ],
      cta: "Solicitar Consultoria",
      highlight: true,
    },
    {
      title: "Premium AEDA Evolution",
      description: "Transformação digital completa com IA, automação e dados",
      features: [
        "Tudo da Consultoria +",
        "Dashboard customizado",
        "Análise de dados avançada",
        "Suporte 3 meses",
      ],
      cta: "Transformar Negócio",
      highlight: false,
    },
  ];

  const aedaMethod = [
    {
      letter: "A",
      title: "Análise",
      description: "Entendemos profundamente seu negócio, processos e desafios",
      image: "/images/aeda-analise-real.png"
    },
    {
      letter: "E",
      title: "Estratégia",
      description: "Definimos a melhor estratégia de automação e IA para você",
      image: "/images/aeda-estrategia-real-v2.png"
    },
    {
      letter: "D",
      title: "Desenvolvimento",
      description: "Implementamos soluções práticas e eficientes",
      image: "/images/aeda-desenvolvimento-real.png"
    },
    {
      letter: "A",
      title: "Acompanhamento",
      description: "Garantimos resultados com suporte contínuo",
      image: "/images/aeda-acompanhamento-real.png"
    },
  ];

  const results = [
    {
      number: "15h",
      description: "economizadas por semana em tarefas repetitivas"
    },
    {
      number: "40%",
      description: "de redução em erros manuais"
    },
    {
      number: "3x",
      description: "mais rápido na geração de relatórios"
    },
    {
      number: "ROI",
      description: "retorno do investimento em até 6 meses"
    }
  ];

  const oldWayProblems = [
    "Terminar projeto e descobrir prejuízo",
    "Dezenas de planilhas desconectadas",
    "Caos entre equipes e departamentos",
    "Preso no operacional sem tempo para estratégia"
  ];

  const newWaySolutions = [
    "Previsibilidade de custos em tempo real",
    "Tudo centralizado em um só lugar",
    "Integração automática de processos",
    "Tempo para investir no crescimento"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#1e40af] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Menos Trabalho Manual, Mais Resultados
              </h1>
              <p className="text-xl md:text-2xl text-blue-50/90 mb-10 leading-relaxed">
                Automação e IA sob medida para construtoras e escritórios de advocacia. Metodologia A.E.D.A. com suporte completo do início ao fim.
              </p>
              
              {/* Seletor de Perfil */}
              <div className="mb-6 animate-fade-in-up-delay-1">
                <p className="text-white/80 text-base mb-4 font-medium">Escolha seu perfil:</p>
                <div className="flex justify-center lg:justify-start gap-4">
                  <Link href="/construtoras">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cta-button">
                      <Building2 className="w-5 h-5" />
                      Construtoras
                    </button>
                  </Link>
                  <Link href="/advogados">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cta-button">
                      <Scale className="w-5 h-5" />
                      Advogados
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up-delay-2">
                <Button
                  className="bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-semibold px-10 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg hover:-translate-y-1 cta-button"
                  asChild
                >
                  <Link href="/contato">Agendar Contato</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white/80 text-white hover:bg-white hover:text-[#1e3a8a] font-semibold px-10 py-6 rounded-xl transition-all duration-300 text-lg hover:shadow-xl backdrop-blur-sm"
                  asChild
                >
                  <Link href="/sobre">Saiba Mais</Link>
                </Button>
              </div>
            </div>
              <div className="hidden lg:block animate-fade-in-up-delay-3">
                <div className="relative hero-image-enhanced depth-layers">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-2xl blur-2xl"></div>
                  <img 
                    src="/images/hero-professional.png" 
                    alt="Profissional usando IA e Automação - Studio AEDA Digital"
                    className="relative rounded-2xl shadow-2xl ring-1 ring-white/10 transform hover:scale-105 transition-transform duration-500 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* NOVA SEÇÃO: Gestão Manual vs IA (Antes/Depois) */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a8a] mb-4 scroll-reveal">
            Ficar preso na gestão manual é tudo o que não queremos para você!
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 scroll-reveal stagger-1">
            Veja a diferença entre continuar como está e transformar com IA
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Gestão Manual (Problemas) */}
            <div className="space-y-4 scroll-reveal stagger-2">
              <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Gestão Manual
              </h3>
              {oldWayProblems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-200 hover-lift">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{problem}</p>
                </div>
              ))}
            </div>

            {/* Imagem Central */}
            <div className="hidden lg:block scroll-reveal stagger-3">
              <div className="relative cta-image-enhanced depth-layers">
                <img 
                  src="/images/cta-transformacao.png" 
                  alt="Transformação Digital com IA" 
                  className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 parallax-image"
                />
              </div>
            </div>

            {/* Gestão com IA (Soluções) */}
            <div className="space-y-4 scroll-reveal stagger-4">
              <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                Gestão com IA
              </h3>
              {newWaySolutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200 hover-lift">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: Resultados com Números Grandes */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a8a] mb-4 scroll-reveal">
            Economize até 15h/semana com Automação Inteligente
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 scroll-reveal stagger-1">
            Resultados reais de empresas que implementaram o método A.E.D.A.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover-lift scroll-reveal text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl md:text-7xl font-bold text-[#1e3a8a] mb-4 gradient-text">
                  {result.number}
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-8 scroll-reveal stagger-2">
            *Dados baseados em implementações do método A.E.D.A. em 2024-2025
          </p>
        </div>
      </section>

      {/* Método A.E.D.A. */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a8a] mb-4 scroll-reveal">
            Nosso Método A.E.D.A.
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 scroll-reveal stagger-1">
            Processo estruturado para garantir resultados consistentes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aedaMethod.map((step, index) => (
              <div key={index} className="text-center scroll-reveal aeda-card-enhanced" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="mb-6 relative group">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-48 object-cover rounded-xl shadow-lg aeda-image aeda-image-enhanced layered-shadow"
                  />
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#f97316] text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-xl animate-pulse-glow">
                    {step.letter}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a8a] mb-4 scroll-reveal">
            Por que escolher Studio AEDA Digital?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 scroll-reveal stagger-1">
            Tecnologia de ponta adaptada ao seu negócio
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover-lift scroll-reveal benefit-card-enhanced layered-shadow" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-48 overflow-hidden benefit-image-enhanced">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 parallax-image"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-10 h-10 text-[#f97316] benefit-icon" />
                      <h3 className="text-2xl font-bold text-[#1e3a8a]">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1e3a8a] mb-4 scroll-reveal">
            Nossos Serviços
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 scroll-reveal stagger-1">
            Escolha o plano ideal para o seu negócio
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 transition-all service-card scroll-reveal ${
                  service.highlight
                    ? "bg-[#1e3a8a] text-white shadow-2xl scale-105 ring-4 ring-[#f97316]"
                    : "bg-white border-2 border-gray-200 text-gray-900"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.highlight && (
                  <div className="bg-[#f97316] text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4 animate-pulse-glow">
                    ⭐ MAIS POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={`mb-6 leading-relaxed ${service.highlight ? "text-blue-50" : "text-gray-600"}`}>
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${service.highlight ? "text-[#f97316]" : "text-green-600"}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full font-semibold py-6 rounded-xl transition-all cta-button ${
                    service.highlight
                      ? "bg-[#f97316] hover:bg-[#ea580c] text-white shadow-lg"
                      : "bg-[#1e3a8a] hover:bg-[#1e2f5e] text-white"
                  }`}
                  asChild
                >
                  <Link href="/contato">{service.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-20 px-4 bg-[#1e3a8a] text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 scroll-reveal">Garantia de Satisfação</h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto scroll-reveal stagger-1">
            Se não ficar satisfeito com os resultados nos primeiros 7 dias, devolvemos 100% do seu investimento.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-xl p-8 hover-lift backdrop-blur-sm scroll-reveal stagger-2">
              <Users className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h3 className="text-xl font-bold mb-3">Equipe Experiente</h3>
              <p className="text-blue-100 leading-relaxed">Profissionais com anos de experiência em IA e automação</p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 hover-lift backdrop-blur-sm scroll-reveal stagger-3">
              <Target className="w-16 h-16 mx-auto mb-6 animate-float-delayed" />
              <h3 className="text-xl font-bold mb-3">Nossa Metodologia</h3>
              <p className="text-blue-100 leading-relaxed">Processo estruturado A.E.D.A. para garantir resultados consistentes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 hover-lift backdrop-blur-sm scroll-reveal stagger-4">
              <Zap className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h3 className="text-xl font-bold mb-3">Implementação Eficiente</h3>
              <p className="text-blue-100 leading-relaxed">Acompanhamento contínuo para garantir adaptação e resultados</p>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: CTA Final Forte */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#0c2d6b] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#f97316] animate-pulse-glow" />
          <h2 className="text-5xl md:text-6xl font-bold mb-6 scroll-reveal">
            Pronto para Economizar 15h/semana?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed max-w-2xl mx-auto scroll-reveal stagger-1">
            Agende um diagnóstico gratuito e descubra como a IA pode transformar seu negócio
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-bold px-12 py-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl cta-button animate-pulse-glow scroll-reveal stagger-2"
            asChild
          >
            <Link href="/contato" className="inline-flex items-center gap-3">
              Agendar Diagnóstico Gratuito
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
          <p className="text-sm mt-6 text-blue-200 scroll-reveal stagger-3">
            ⚡ Sem compromisso • 30 minutos • 100% gratuito
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
