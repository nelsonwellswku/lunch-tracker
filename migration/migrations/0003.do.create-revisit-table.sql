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
  (0, 'Unsure'),
  (1, 'Yes'),
  (2, 'No');

commit transaction;
set xact_abort off;
