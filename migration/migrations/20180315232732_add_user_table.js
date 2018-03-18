exports.up = knex => knex
  .schema
  .createTable('AppUser', (table) => {
    table.uuid('AppUserId').primary('PK_AppUser');
    table.string('EmailAddress', 255).unique('UX_AppUser_EmailAddress');
    table.binary('PasswordHash');
  });


exports.down = knex => knex
  .schema
  .dropTableIfExists('AppUser');
