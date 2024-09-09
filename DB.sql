CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    ci VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100),
    apellido_materno varchar(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER REFERENCES roles(id),
    estado BOOLEAN DEFAULT true
);

CREATE OR REPLACE FUNCTION assign_default_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Encuentra el ID del rol de cliente
    DECLARE
        cliente_role_id INT;
    BEGIN
        SELECT id INTO cliente_role_id FROM roles WHERE nombre = 'cliente';
        
        -- Asigna el rol de cliente al nuevo usuario
        NEW.rol_id := cliente_role_id;
        
        RETURN NEW;
    END;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_default_role
BEFORE INSERT ON usuarios
FOR EACH ROW
EXECUTE FUNCTION assign_default_role();

