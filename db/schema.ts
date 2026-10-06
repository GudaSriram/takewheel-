// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  owner: text('owner').notNull(),
  created: text('created').notNull(),
  status: text('status').notNull(),
  details: text('details').notNull(),
}, t => [index('idx_bookings_owner_created').on(t.owner, t.created)]);
