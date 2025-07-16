import {
  integer,
  json,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const chatHistoryTable = pgTable("chathistory", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  recordId: varchar().notNull(),
  content: json(),
  userEmail: varchar("userEmail").references(() => usersTable.email),
  createdAt: timestamp().defaultNow(),
  aiAgentType: varchar(),
  metaData: varchar(),
});
