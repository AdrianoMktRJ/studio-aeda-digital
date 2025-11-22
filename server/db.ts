import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  InsertUser, 
  users, 
  formSubmissions, 
  InsertFormSubmission,
  chatLeads,
  InsertChatLead,
  chatConversations,
  InsertChatConversation,
  chatMessages,
  InsertChatMessage
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Criar uma nova submissão de formulário
 */
export async function createFormSubmission(submission: InsertFormSubmission) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(formSubmissions).values(submission);
  return submission;
}

/**
 * Buscar todas as submissões de formulários
 */
export async function getAllFormSubmissions() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(formSubmissions).orderBy(formSubmissions.createdAt);
}

/**
 * Buscar submissões por tipo
 */
export async function getFormSubmissionsByType(type: "diagnostico" | "contato") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(formSubmissions).where(eq(formSubmissions.type, type));
}


// ==================== CHATBOT FUNCTIONS ====================

/**
 * Criar uma nova conversa do chatbot
 */
export async function createChatConversation(conversation: InsertChatConversation) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(chatConversations).values(conversation);
  return conversation;
}

/**
 * Buscar conversa por sessionId
 */
export async function getChatConversationBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.sessionId, sessionId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Atualizar conversa para associar com lead
 */
export async function updateConversationWithLead(conversationId: string, leadId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(chatConversations)
    .set({ leadId, updatedAt: new Date() })
    .where(eq(chatConversations.id, conversationId));
}

/**
 * Finalizar conversa
 */
export async function finalizeChatConversation(conversationId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(chatConversations)
    .set({ status: "finalizada", updatedAt: new Date() })
    .where(eq(chatConversations.id, conversationId));
}

/**
 * Criar uma nova mensagem do chat
 */
export async function createChatMessage(message: InsertChatMessage) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(chatMessages).values(message);
  return message;
}

/**
 * Buscar mensagens de uma conversa
 */
export async function getChatMessages(conversationId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(chatMessages.createdAt);
}

/**
 * Criar um novo lead capturado pelo chatbot
 */
export async function createChatLead(lead: InsertChatLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(chatLeads).values(lead);
  return lead;
}

/**
 * Buscar lead por email
 */
export async function getChatLeadByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(chatLeads)
    .where(eq(chatLeads.email, email))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Buscar todos os leads
 */
export async function getAllChatLeads() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db
    .select()
    .from(chatLeads)
    .orderBy(desc(chatLeads.createdAt));
}

/**
 * Atualizar status do lead
 */
export async function updateChatLeadStatus(
  leadId: string,
  status: "novo" | "contatado" | "qualificado" | "convertido"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(chatLeads)
    .set({ status })
    .where(eq(chatLeads.id, leadId));
}
