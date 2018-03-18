exports.up = knex => knex
  .schema
  .createTable('AppUser', (table) => {
    table.uuid('AppUserId').primary('PK_AppUser').default(knex.raw('NEWID()'));
    table.string('EmailAddress', 255).notNullable().unique('UX_AppUser_EmailAddress');
    table.string('PasswordHash', 60).notNullable();
  });


exports.down = knex => knex
  .schema
  .dropTableIfExists('AppUser');
