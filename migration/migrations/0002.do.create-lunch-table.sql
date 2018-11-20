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
