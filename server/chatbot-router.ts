import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import {
  createChatConversation,
  getChatConversationBySessionId,
  createChatMessage,
  getChatMessages,
  createChatLead,
  updateConversationWithLead,
  getChatLeadByEmail,
} from "./db";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

/**
 * Sistema de prompts para o assistente virtual
 */
const ASSISTANT_SYSTEM_PROMPT = `Você é o assistente virtual do Studio AEDA Digital, uma empresa especializada em automação e inteligência artificial para construtoras e escritórios de advocacia.

**Sua missão:**
- Qualificar leads de forma natural e conversacional
- Entender as necessidades específicas de cada cliente
- Agendar diagnósticos gratuitos
- Explicar o método A.E.D.A. (Análise, Estratégia, Desenvolvimento, Acompanhamento)
- Capturar informações de contato quando apropriado

**Método A.E.D.A.:**
1. **Análise**: Entendemos profundamente o negócio, processos e desafios
2. **Estratégia**: Definimos a melhor estratégia de automação e IA
3. **Desenvolvimento**: Implementamos soluções práticas e eficientes
4. **Acompanhamento**: Garantimos resultados com suporte contínuo

**Planos disponíveis:**
1. **Mentoria IA na Prática**: Sessões semanais 1:1, diagnóstico inicial, plano de ação customizado
2. **Consultoria AEDA Performance** (MAIS POPULAR): Análise profunda, implementação de automações, treinamento da equipe
3. **Premium AEDA Evolution**: Transformação digital completa com IA, automação, dashboard customizado e análise de dados avançada

**Garantia**: 7 dias de garantia total - se não ficar satisfeito, devolvemos 100% do investimento.

**Tom de voz:**
- Profissional mas acessível
- Empático e consultivo
- Focado em entender antes de vender
- Use emojis moderadamente para humanizar

**Fluxo de qualificação:**
1. Cumprimente e pergunte como pode ajudar
2. Identifique se é construtora ou escritório de advocacia
3. Entenda os principais desafios
4. Explique como o Studio AEDA pode ajudar
5. Ofereça diagnóstico gratuito
6. Capture: nome, email, telefone, empresa

**IMPORTANTE:**
- Seja conciso (máximo 3-4 linhas por mensagem)
- Faça UMA pergunta por vez
- Não seja insistente
- Se o usuário não quiser fornecer dados, respeite
- Sempre ofereça valor antes de pedir informações`;

/**
 * Router do chatbot
 */
export const chatbotRouter = router({
  /**
   * Iniciar ou retomar conversa
   */
  getOrCreateConversation: publicProcedure
    .input(z.object({
      sessionId: z.string(),
    }))
    .query(async ({ input }) => {
      // Buscar conversa existente
      let conversation = await getChatConversationBySessionId(input.sessionId);

      // Se não existir, criar nova
      if (!conversation) {
        const id = nanoid();
        conversation = await createChatConversation({
          id,
          sessionId: input.sessionId,
          leadId: null,
          status: "ativa",
        });

        // Criar mensagem de boas-vindas
        await createChatMessage({
          id: nanoid(),
          conversationId: id,
          role: "assistant",
          content: "Olá! 👋 Sou o assistente virtual do Studio AEDA Digital.\n\nAjudamos você a automatizar processos e implementar IA de forma prática.\n\nComo posso te ajudar hoje?",
        });
      }

      // Buscar mensagens da conversa
      const messages = await getChatMessages(conversation.id);

      return {
        conversation,
        messages,
      };
    }),

  /**
   * Enviar mensagem e receber resposta do assistente
   */
  sendMessage: publicProcedure
    .input(z.object({
      conversationId: z.string(),
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      // Salvar mensagem do usuário
      await createChatMessage({
        id: nanoid(),
        conversationId: input.conversationId,
        role: "user",
        content: input.message,
      });

      // Buscar histórico de mensagens
      const messages = await getChatMessages(input.conversationId);

      // Preparar contexto para o LLM
      const llmMessages = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      // Gerar resposta com LLM
      const response = await invokeLLM({
        messages: [
          { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
          ...llmMessages,
        ],
      });

      const assistantMessage = response.choices[0].message.content || "Desculpe, não entendi. Pode reformular?";

      // Salvar resposta do assistente
      await createChatMessage({
        id: nanoid(),
        conversationId: input.conversationId,
        role: "assistant",
        content: assistantMessage,
      });

      return {
        message: assistantMessage,
      };
    }),

  /**
   * Capturar lead (quando usuário fornece dados de contato)
   */
  captureLead: publicProcedure
    .input(z.object({
      conversationId: z.string(),
      name: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      company: z.string().optional(),
      segment: z.enum(["construtoras", "advocacia", "outro"]).optional(),
      interest: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Verificar se lead já existe
      const existingLead = await getChatLeadByEmail(input.email);

      let leadId: string;

      if (existingLead) {
        leadId = existingLead.id;
      } else {
        // Criar novo lead
        leadId = nanoid();
        await createChatLead({
          id: leadId,
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          company: input.company || null,
          segment: input.segment || null,
          interest: input.interest || null,
          status: "novo",
        });

        // Notificar proprietário
        const message = `🤖 **Novo Lead Capturado pelo Assistente Virtual**\n\n` +
          `👤 **Nome:** ${input.name}\n` +
          `📧 **Email:** ${input.email}\n` +
          `${input.phone ? `📱 **Telefone:** ${input.phone}\n` : ""}` +
          `${input.company ? `🏢 **Empresa:** ${input.company}\n` : ""}` +
          `${input.segment ? `🎯 **Segmento:** ${input.segment}\n` : ""}` +
          `${input.interest ? `💡 **Interesse:** ${input.interest}` : ""}`;

        await notifyOwner({
          title: "🤖 Novo Lead do Chatbot - Studio AEDA",
          content: message,
        });
      }

      // Associar lead à conversa
      await updateConversationWithLead(input.conversationId, leadId);

      return {
        success: true,
        leadId,
      };
    }),

  /**
   * Buscar histórico de mensagens
   */
  getMessages: publicProcedure
    .input(z.object({
      conversationId: z.string(),
    }))
    .query(async ({ input }) => {
      const messages = await getChatMessages(input.conversationId);
      return { messages };
    }),
});
