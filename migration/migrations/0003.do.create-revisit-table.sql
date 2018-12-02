set xact_abort on;
begin transaction;

create table Revisit
(
  RevisitId int not null,
  RevisitName varchar(6) not null,

  constraint [PK_Revisit] primary key clustered (RevisitId asc)
);

insert into Revisit
  (RevisitId, RevisitName)
values
  (0, 'unsure'),
  (1, 'yes'),
  (2, 'no');

commit transaction;
set xact_abort off;
