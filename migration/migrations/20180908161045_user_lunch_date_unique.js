
exports.up = knex => knex.schema.alterTable('Lunch', (table) => {
  table.unique(['AppUserId', 'LunchDate'], 'UX_Lunch_AppUserId_LunchDate');
});

exports.down = knex => knex.schema.alterTable('Lunch', (table) => {
  table.dropUnique('', 'UX_Lunch_AppUserId_LunchDate');
});
