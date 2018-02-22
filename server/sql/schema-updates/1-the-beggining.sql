CREATE DATABASE codeinaction_project_diary;
\c codeinaction_project_diary

CREATE SEQUENCE seq_users;
CREATE TABLE users (
    id int NOT NULL CONSTRAINT pk_users PRIMARY KEY DEFAULT nextval('seq_users'),

    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,

    CONSTRAINT uq_users_email UNIQUE (email)
);
ALTER SEQUENCE seq_users OWNED BY users.id;

CREATE SEQUENCE seq_diaries;
CREATE TABLE diaries (
    id int NOT NULL
      CONSTRAINT pk_diaries PRIMARY KEY DEFAULT nextval('seq_diaries'),

    user_id int NOT NULL,
    link text NOT NULL,

    name text,
    public boolean
      CONSTRAINT df_diaries_public DEFAULT (false),

    created_date timestamp NOT NULL
      CONSTRAINT df_diaries_created_date DEFAULT (now()),

    updated_date timestamp NULL,

    CONSTRAINT fk_diaries_users FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT uq_diaries_link UNIQUE (link)
);
ALTER SEQUENCE seq_diaries OWNED BY diaries.id;

CREATE SEQUENCE seq_diary_entries;
CREATE TABLE diary_entries (
    id int NOT NULL
      CONSTRAINT pk_diary_entries PRIMARY KEY DEFAULT nextval('seq_diary_entries'),

    diary_id int NOT NULL,
    body text,

    note_date timestamp NOT NULL,
    updated_date timestamp NULL,

    created_date timestamp NOT NULL
      CONSTRAINT df_diary_entries_created_date DEFAULT (now()),

    CONSTRAINT fk_diary_entries_diaries FOREIGN KEY (diary_id) REFERENCES diaries (id)
);
ALTER SEQUENCE seq_diary_entries OWNED BY diary_entries.id;

