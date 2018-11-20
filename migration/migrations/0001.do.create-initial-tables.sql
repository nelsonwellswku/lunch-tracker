set xact_abort on;
begin transaction;

create table AppUser
(
  AppUserId int identity(1, 1) not null,
  EmailAddress nvarchar(255) not null,
  PasswordHash nvarchar(60) not null,
  Verified bit not null default(0),
  CreatedAt datetime2 not null default(getutcdate()),

  constraint [PK_AppUser] primary key clustered (AppUserId asc),
  constraint [UX_AppUser_EmailAddress] unique (EmailAddress)
);

create table RegistrationToken
(
  RegistrationTokenId int identity(1,1) not null,
  AppUserId int not null,
  Token uniqueidentifier not null,
  CreatedAt datetime2 not null default(getutcdate()),

  constraint [FK_RegistrationToken_AppUser] foreign key (AppUserId) references AppUser(AppUserId)
)

create table Lunch
(
  LunchId int identity(1,1) not null,
  AppUserId int not null,
  [Location] nvarchar(60) not null,
  Cost decimal(8,2) null,
  Revisit nvarchar(6) not null,
  LunchDate date not null,

  constraint [PK_Lunch] primary key clustered (LunchId asc),
  constraint [FK_Lunch_AppUser] foreign key (AppUserId) references AppUser(AppUserId)
)


commit transaction;
set xact_abort off;
