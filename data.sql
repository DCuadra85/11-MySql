DROP DATABASE IF EXISTS employeetrackerdb;
CREATE DATABASE employeetrackerdb;
USE employeetrackerdb;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary INTEGER,
  department_id INTEGER NOT NULL,
  FOREIGN KEY(department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Administration"), ("Intelligence"), ("Operations"), ("Communications");

INSERT INTO role (title, salary, department_id)
VALUES ("Reception", 40000, 1), ("Manager", 60000, 1), ("Administrator", 50000, 1), 
("Intelligence Analyst", 40000, 2), ("Counter Intelligence", 50000, 2), ("GeoSpatial Intelligence", 40000, 2),
("Targeting", 40000, 3), ("Operator", 50000, 3), ("Stategist", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Paul", "Mills", 1), ("John", "Doe", 2), ("James", "Bond", 3);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

