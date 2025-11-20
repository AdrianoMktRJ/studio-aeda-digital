import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { chatbotRouter } from "./chatbot-router";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFormSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { createHubSpotContact, createHubSpotDeal, searchHubSpotContact } from "./hubspot";

export const appRouter = router({
  system: systemRouter,
  chatbot: chatbotRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Router para submissões de formulários
  forms: router({
    submitDiagnostico: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          company: z.string(),
          employees: z.string(),
          challenge: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Gerar ID único
        const id = `diag_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Salvar no banco de dados
        await createFormSubmission({
          id,
          type: "diagnostico",
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          employees: input.employees,
          challenge: input.challenge,
          message: null,
        });

        // Enviar notificação ao proprietário
        const message = `📊 **Novo Diagnóstico Solicitado**\n\n` +
          `👤 **Nome:** ${input.name}\n` +
          `📧 **Email:** ${input.email}\n` +
          `📱 **Telefone:** ${input.phone}\n` +
          `🏭 **Empresa:** ${input.company}\n` +
          `👥 **Funcionários:** ${input.employees}\n` +
          `🎯 **Desafio:** ${input.challenge}`;

        await notifyOwner({
          title: "📊 Novo Diagnóstico - Studio AEDA",
          content: message,
        });

        // Enviar mensagem de agradecimento via WhatsApp
        const { whatsappService } = await import("./services/whatsapp");
        await whatsappService.sendThankYouMessage(input.phone, input.name);

        return { 
          success: true, 
          id,
          redirectUrl: "/diagnostico-detalhado"
        };
      }),

    submitContato: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          message: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Gerar ID único
        const id = `cont_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Salvar no banco de dados
        await createFormSubmission({
          id,
          type: "contato",
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          message: input.message,
          company: null,
          employees: null,
          challenge: null,
        });

        // Enviar notificação ao proprietário
        const message = `💬 **Novo Contato Recebido**\n\n` +
          `👤 **Nome:** ${input.name}\n` +
          `📧 **Email:** ${input.email}\n` +
          `${input.phone ? `📱 **Telefone:** ${input.phone}\n` : ""}` +
          `📝 **Mensagem:** ${input.message}`;

        await notifyOwner({
          title: "💬 Novo Contato - Studio AEDA",
          content: message,
        });

        // Enviar mensagem para WhatsApp
        const whatsappMessage = `🔔 *Novo Contato Recebido*\n\n` +
          `👤 Nome: ${input.name}\n` +
          `📧 Email: ${input.email}\n` +
          `${input.phone ? `📱 Telefone: ${input.phone}\n` : ""}` +
          `📝 Mensagem: ${input.message}`;
        
        // Enviar para WhatsApp (usando API do WhatsApp Business ou serviço de terceiros)
        // Por enquanto, a notificação do Manus já está funcionando
        // Para integração real com WhatsApp, você precisará de uma API como Twilio, Evolution API, etc.

        return { success: true, id };
      }),

    submitDetailedDiagnosis: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          company: z.string(),
          clientProfile: z.string(),
          clientLocation: z.string(),
          clientPainPoints: z.string(),
          instagramUrl: z.string().optional(),
          facebookUrl: z.string().optional(),
          linkedinUrl: z.string().optional(),
          websiteUrl: z.string().optional(),
          otherChannels: z.string().optional(),
          timeConsumingProcesses: z.string(),
          manualTasks: z.string(),
          growthGoals: z.string(),
          monthlyRevenue: z.string(),
          desiredResults: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Gerar ID único
        const id = `detailed_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Salvar no banco de dados (expandir tabela depois)
        const detailedData = JSON.stringify(input);
        
        // Enviar notificação ao proprietário com dados completos
        const message = `📊 **Diagnóstico Detalhado Recebido**\n\n` +
          `👤 **Nome:** ${input.name}\n` +
          `📧 **Email:** ${input.email}\n` +
          `📱 **WhatsApp:** ${input.phone}\n` +
          `🏭 **Empresa:** ${input.company}\n\n` +
          `**Perfil dos Clientes:**\n${input.clientProfile}\n\n` +
          `**Localização:** ${input.clientLocation}\n\n` +
          `**Dores dos Clientes:**\n${input.clientPainPoints}\n\n` +
          `**Redes Sociais:**\n` +
          `${input.instagramUrl ? `📷 Instagram: ${input.instagramUrl}\n` : ""}` +
          `${input.facebookUrl ? `👍 Facebook: ${input.facebookUrl}\n` : ""}` +
          `${input.linkedinUrl ? `💼 LinkedIn: ${input.linkedinUrl}\n` : ""}` +
          `${input.websiteUrl ? `🌐 Site: ${input.websiteUrl}\n` : ""}\n` +
          `**Processos que Consomem Tempo:**\n${input.timeConsumingProcesses}\n\n` +
          `**Tarefas Manuais:**\n${input.manualTasks}\n\n` +
          `**Faturamento Mensal:** ${input.monthlyRevenue}\n` +
          `**Objetivos de Crescimento:**\n${input.growthGoals}\n\n` +
          `**Expectativas com IA:**\n${input.desiredResults}`;

        await notifyOwner({
          title: "📊 Diagnóstico Detalhado - Studio AEDA",
          content: message,
        });

        // Enviar link de agendamento via WhatsApp
        const { whatsappService } = await import("./services/whatsapp");
        const { calendarService } = await import("./services/calendar");
        
        const schedulingUrl = calendarService.generateSchedulingUrl(input.email, input.name);
        await whatsappService.sendSchedulingLink(input.phone, input.name, schedulingUrl);

        // TODO: Integrar com sistema de análise de redes sociais
        // TODO: Gerar relatório PDF automaticamente

        return { success: true, id, schedulingUrl };
      }),

    // Endpoint para formulário de Construtoras
    submitConstrutoras: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          company: z.string(),
          numeroObras: z.string(),
          porte: z.string(),
          desafios: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Gerar ID único
        const id = `const_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Salvar no banco de dados
        await createFormSubmission({
          id,
          type: "construtoras",
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          employees: input.porte,
          challenge: `Obras: ${input.numeroObras} | Desafios: ${input.desafios || "Não informado"}`,
          message: null,
        });

        // Integração com HubSpot
        try {
          // Buscar contato existente
          let contactId = await searchHubSpotContact(input.email);

          // Se não existir, criar novo contato
          if (!contactId) {
            const [firstname, ...lastnameArr] = input.name.split(' ');
            const lastname = lastnameArr.join(' ');

            contactId = await createHubSpotContact({
              email: input.email,
              firstname,
              lastname: lastname || undefined,
              phone: input.phone,
              company: input.company,
            });
          }

          // Criar deal no HubSpot
          await createHubSpotDeal(
            {
              dealname: `Construtora: ${input.company}`,
              dealstage: 'appointmentscheduled',
              pipeline: 'default',
            },
            contactId
          );

          console.log('✅ Lead enviado para HubSpot com sucesso');
        } catch (error) {
          console.error('❌ Erro ao enviar para HubSpot:', error);
          // Não falhar o formulário se HubSpot falhar
        }

        // Enviar notificação ao proprietário
        const message = `🏗️ **Novo Lead - Construtoras**\n\n` +
          `👤 **Nome:** ${input.name}\n` +
          `📧 **Email:** ${input.email}\n` +
          `📱 **Telefone:** ${input.phone}\n` +
          `🏭 **Construtora:** ${input.company}\n` +
          `🏗️ **Obras Ativas:** ${input.numeroObras}\n` +
          `📊 **Porte:** ${input.porte}\n` +
          `🎯 **Desafios:** ${input.desafios || "Não informado"}`;

        await notifyOwner({
          title: "🏗️ Novo Lead Construtoras - Studio AEDA",
          content: message,
        });

        return { success: true, id };
      }),

    // Endpoint para formulário de Advogados
    submitAdvogados: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
          company: z.string(),
          areaAtuacao: z.string(),
          numeroProcessos: z.string(),
          desafio: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Gerar ID único
        const id = `adv_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Salvar no banco de dados
        await createFormSubmission({
          id,
          type: "advogados",
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          employees: input.numeroProcessos,
          challenge: `Área: ${input.areaAtuacao} | Desafio: ${input.desafio || "Não informado"}`,
          message: null,
        });

        // Integração com HubSpot
        try {
          // Buscar contato existente
          let contactId = await searchHubSpotContact(input.email);

          // Se não existir, criar novo contato
          if (!contactId) {
            const [firstname, ...lastnameArr] = input.name.split(' ');
            const lastname = lastnameArr.join(' ');

            contactId = await createHubSpotContact({
              email: input.email,
              firstname,
              lastname: lastname || undefined,
              phone: input.phone,
              company: input.company,
            });
          }

          // Criar deal no HubSpot
          await createHubSpotDeal(
            {
              dealname: `Advogado: ${input.company}`,
              dealstage: 'appointmentscheduled',
              pipeline: 'default',
            },
            contactId
          );

          console.log('✅ Lead enviado para HubSpot com sucesso');
        } catch (error) {
          console.error('❌ Erro ao enviar para HubSpot:', error);
          // Não falhar o formulário se HubSpot falhar
        }

        // Enviar notificação ao proprietário
        const message = `⚖️ **Novo Lead - Advogados**\n\n` +
          `👤 **Nome:** ${input.name}\n` +
          `📧 **Email:** ${input.email}\n` +
          `📱 **Telefone:** ${input.phone}\n` +
          `🏛️ **Escritório:** ${input.company}\n` +
          `⚖️ **Área de Atuação:** ${input.areaAtuacao}\n` +
          `📁 **Processos Ativos:** ${input.numeroProcessos}\n` +
          `🎯 **Desafio:** ${input.desafio || "Não informado"}`;

        await notifyOwner({
          title: "⚖️ Novo Lead Advogados - Studio AEDA",
          content: message,
        });

        return { success: true, id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
