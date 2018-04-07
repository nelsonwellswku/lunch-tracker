
exports.up = knex => knex
  .schema
  .createTable('Lunch', (table) => {
    table.uuid('LunchId').primary('PK_Lunch').default(knex.raw('NEWID()'));
    table.uuid('AppUserId').notNullable();
    table.string('Location', 60).notNullable();
    table.decimal('Cost', 8, 2);
    table.string('Revisit', 6).notNullable();
    table.date('LunchDate').notNullable();

    table
      .foreign('AppUserId', 'FK_Lunch_AppUser_AppUserId')
      .references('AppUser.AppUserId');
  });

exports.down = knex => knex.schema.dropTable('Lunch');
