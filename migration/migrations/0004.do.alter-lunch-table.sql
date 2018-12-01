set xact_abort on;
begin transaction;

alter table Lunch
add RevisitId int not null;

alter table Lunch
add constraint FK_Lunch_Revisit
foreign key (RevisitId) references Revisit(RevisitId);

alter table Lunch
add RestaurantId int not null;

alter table Lunch
add constraint FK_Lunch_Restaurant
foreign key (RestaurantId) references Restaurant(RestaurantId);

alter table Lunch
drop column [Location];

alter table Lunch
drop column Revisit;

commit transaction;
set xact_abort off;
