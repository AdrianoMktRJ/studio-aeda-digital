import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela para armazenar submissões de formulários
 */
export const formSubmissions = mysqlTable("form_submissions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  type: mysqlEnum("type", ["diagnostico", "contato", "construtoras", "advogados"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  employees: varchar("employees", { length: 50 }),
  message: text("message"),
  challenge: text("challenge"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type FormSubmission = typeof formSubmissions.$inferSelect;
export type InsertFormSubmission = typeof formSubmissions.$inferInsert;

/**
 * Tabela para armazenar leads capturados pelo assistente virtual
 */
export const chatLeads = mysqlTable("chat_leads", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  segment: mysqlEnum("segment", ["construtoras", "advocacia", "outro"]),
  interest: text("interest"), // O que o lead está procurando
  status: mysqlEnum("status", ["novo", "contatado", "qualificado", "convertido"]).default("novo").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ChatLead = typeof chatLeads.$inferSelect;
export type InsertChatLead = typeof chatLeads.$inferInsert;

/**
 * Tabela para armazenar conversas do chatbot
 */
export const chatConversations = mysqlTable("chat_conversations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(), // ID da sessão do navegador
  leadId: varchar("leadId", { length: 64 }), // Referência ao lead (quando capturado)
  status: mysqlEnum("status", ["ativa", "finalizada"]).default("ativa").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;

/**
 * Tabela para armazenar mensagens do chatbot
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: varchar("id", { length: 64 }).primaryKey(),
  conversationId: varchar("conversationId", { length: 64 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;
