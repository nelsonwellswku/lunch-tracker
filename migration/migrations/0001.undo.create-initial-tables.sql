set xact_abort on;
begin transaction;

drop table Lunch;
drop table RegistrationToken;
drop table AppUser;

commit transaction;
set xact_abort off;
