exports.up = knex => knex
  .schema
  .createTable('RegistrationToken', (table) => {
    table.uuid('RegistrationTokenId').primary('PK_RegistrationTokenId').default(knex.raw('NEWID()'));
    table.uuid('AppUserId').notNullable().references('AppUser.AppUserId').withKeyName('FK_RegistrationToken_AppUser');
    table.uuid('Token').notNullable();
    table.dateTime('CreatedAt').notNullable().default(knex.raw('GETUTCDATE()'));
  });

exports.down = knex => knex
  .schema
  .dropTableIfExists('RegistrationToken');
