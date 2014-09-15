# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table action (
  id                        integer not null,
  startdate                 timestamp,
  assignee_username         varchar(255),
  description               varchar(255),
  incident_id               integer,
  constraint pk_action primary key (id))
;

create table assignee (
  username                  varchar(255) not null,
  password                  varchar(255),
  fullname                  varchar(255),
  email                     varchar(255),
  active                    boolean,
  constraint pk_assignee primary key (username))
;

create table category (
  id                        integer not null,
  type                      varchar(255),
  constraint pk_category primary key (id))
;

create table contact (
  id                        integer not null,
  email                     varchar(255),
  fullname                  varchar(255),
  phone                     varchar(255),
  active                    boolean,
  constraint pk_contact primary key (id))
;

create table incident (
  id                        integer not null,
  owner_username            varchar(255),
  category_id               integer,
  subject                   varchar(255),
  description               varchar(255),
  startdate                 timestamp,
  enddate                   timestamp,
  priority                  integer,
  status                    varchar(255),
  requester_id              integer,
  constraint pk_incident primary key (id))
;

create sequence action_seq;

create sequence assignee_seq;

create sequence category_seq;

create sequence contact_seq;

create sequence incident_seq;

alter table action add constraint fk_action_assignee_1 foreign key (assignee_username) references assignee (username) on delete restrict on update restrict;
create index ix_action_assignee_1 on action (assignee_username);
alter table action add constraint fk_action_incident_2 foreign key (incident_id) references incident (id) on delete restrict on update restrict;
create index ix_action_incident_2 on action (incident_id);
alter table incident add constraint fk_incident_owner_3 foreign key (owner_username) references assignee (username) on delete restrict on update restrict;
create index ix_incident_owner_3 on incident (owner_username);
alter table incident add constraint fk_incident_category_4 foreign key (category_id) references category (id) on delete restrict on update restrict;
create index ix_incident_category_4 on incident (category_id);
alter table incident add constraint fk_incident_requester_5 foreign key (requester_id) references contact (id) on delete restrict on update restrict;
create index ix_incident_requester_5 on incident (requester_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists action;

drop table if exists assignee;

drop table if exists category;

drop table if exists contact;

drop table if exists incident;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists action_seq;

drop sequence if exists assignee_seq;

drop sequence if exists category_seq;

drop sequence if exists contact_seq;

drop sequence if exists incident_seq;

