exports.up = knex => knex
  .schema
  .alterTable('AppUser', (table) => {
    table.boolean('Verified').notNull().default(false);
  });

exports.down = knex => knex
  .schema
  .alterTable('AppUser', (table) => {
    table.dropColumn('Verified');
  });
