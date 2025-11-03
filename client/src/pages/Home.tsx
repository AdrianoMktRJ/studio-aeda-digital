import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Zap, Target, TrendingUp, Users, Brain, ArrowRight } from "lucide-react";

export default function Home() {

  const benefits = [
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Elimine tarefas repetitivas e libere tempo para decisões estratégicas",
    },
    {
      icon: TrendingUp,
      title: "Aumento de Produtividade",
      description: "Estudos mostram que a automação pode reduzir tarefas repetitivas significativamente",
    },
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Tecnologia de ponta adaptada ao seu negócio",
    },
  ];

  const services = [
    {
      title: "Mentoria IA na Prática",
      price: "R$ 2.000 - R$ 2.500",
      duration: "4 semanas",
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
      price: "R$ 3.500 - R$ 6.000",
      duration: "4-6 semanas",
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
      price: "R$ 8.000 - R$ 8.500",
      duration: "6-8 semanas",
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
    },
    {
      letter: "E",
      title: "Estratégia",
      description: "Definimos a melhor estratégia de automação e IA para você",
    },
    {
      letter: "D",
      title: "Desenvolvimento",
      description: "Implementamos soluções práticas e eficientes",
    },
    {
      letter: "A",
      title: "Acompanhamento",
      description: "Garantimos resultados com suporte contínuo",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#1e3a8a] to-[#1e3a8a]/90">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Gestão Inteligente com IA
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Mais produtividade, menos complexidade. Automação e IA sob medida para construtoras e escritórios de advocacia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#f97316] hover:bg-[#b86105] text-white font-semibold px-8 py-6 rounded-lg shadow-md transition-all text-lg"
              asChild
            >
              <Link href="/contato">Agendar Contato</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-lg text-lg"
              asChild
            >
              <Link href="/sobre">Saiba Mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Método A.E.D.A. */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-[#1e3a8a] mb-12">Nosso Método A.E.D.A.</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {aedaMethod.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#f97316] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {step.letter}
                </div>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-[#1e3a8a] mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-lg p-8 transition-all ${
                  service.highlight
                    ? "bg-[#1e3a8a] text-white shadow-xl scale-105"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className={`text-lg font-semibold mb-2 ${service.highlight ? "text-[#f97316]" : "text-[#f97316]"}`}>
                  {service.price}
                </p>
                <p className={`text-sm mb-4 ${service.highlight ? "text-blue-100" : "text-gray-600"}`}>
                  Duração: {service.duration}
                </p>
                <p className={`mb-6 ${service.highlight ? "text-blue-50" : "text-gray-600"}`}>
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full font-semibold py-6 rounded-lg transition-all ${
                    service.highlight
                      ? "bg-[#f97316] hover:bg-[#b86105] text-white"
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
      <section className="py-16 px-4 bg-[#1e3a8a] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Garantia de Satisfação</h2>
          <p className="text-xl mb-8 text-blue-100">
            Se não ficar satisfeito com os resultados nos primeiros 7 dias, devolvemos 100% do seu investimento.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Equipe Experiente</h3>
              <p className="text-blue-100">Profissionais com anos de experiência em IA e automação</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Nossa Metodologia</h3>
              <p className="text-blue-100">Processo estruturado A.E.D.A. para garantir resultados consistentes</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Zap className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Implementação Eficiente</h3>
              <p className="text-blue-100">Acompanhamento contínuo para garantir adaptação e resultados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-6">Pronto para transformar seu negócio?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Comece com um diagnóstico gratuito e descubra 3 oportunidades de IA específicas para seu negócio.
          </p>
          <Button
            className="bg-[#f97316] hover:bg-[#b86105] text-white font-semibold px-12 py-6 rounded-lg shadow-md transition-all text-lg inline-flex items-center gap-2"
            asChild
          >
            <Link href="/contato">
              Solicitar Agendar Contato
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
