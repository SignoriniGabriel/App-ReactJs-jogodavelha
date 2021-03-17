create database jogodavelha;

create table partidas (
	id int unsigned not null auto_increment,
    jogadas text,
    primary key(id)
);