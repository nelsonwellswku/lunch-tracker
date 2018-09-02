// TODO: Consider putting a unique constraint on (AppUserId, LunchDate)


exports.up = knex => knex.schema.alterTable('Lunch', (table) => {
  table.date('LunchDate').notNullable().alter();
});

exports.down = knex => knex.schema.alterTable('Lunch', (table) => {
  table.specificType('LunchDate', 'datetime2').notNullable().alter();
});

