create table divisions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamp with time zone default now()
);

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(120) NOT NULL,
    slug VARCHAR(140) UNIQUE NOT NULL,

    logo_url TEXT,

    description TEXT,

    division_id UUID NOT NULL,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    CONSTRAINT fk_teams_division
        FOREIGN KEY (division_id)
        REFERENCES divisions(id)
        ON DELETE CASCADE
);

-- ENUM roles
CREATE TYPE user_role AS ENUM (
  'admin',
  'leader'
);

-- ENUM status
CREATE TYPE user_status AS ENUM (
  'active',
  'inactive'
);

-- Tabla users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,

  role user_role NOT NULL DEFAULT 'leader',
  status user_status NOT NULL DEFAULT 'active',

  team_id UUID NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_team
    FOREIGN KEY (team_id)
    REFERENCES teams(id)
    ON DELETE SET NULL
);