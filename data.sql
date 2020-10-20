DROP DATABASE IF EXISTS employeetrackerdb;
CREATE DATABASE employeetrackerdb;
USE employeetrackerdb;
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary INTEGER,
  department_id INTEGER NOT NULL,
  FOREIGN KEY(department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY(role_id) REFERENCES department(id),
  manager_id INTEGER NOT NULL,
  FOREIGN KEY(manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Administration"), ("Intelligence"), ("Operations"), ("Communications");

INSERT INTO role (title, salary, department_id)
VALUES ("Reception", 40000, 1), ("Manager", 60000, 1), ("Administrator", 50000, 1), 
("Intelligence Analyst", 40000, 2), ("Counter Intelligence", 50000, 2), ("GeoSpatial Intelligence", 40000, 2),
("Targeting", 40000, 3), ("Operator", 50000, 3), ("Stategist", 60000, 3),
("Communications Officer", 40000, 4), ("Communication Security", 50000, 4), ("ComSec Custodian", 60000, 4);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;
--exampleguidetoreview, needtoadjustforuse
SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist 
FROM top_albums 
INNER JOIN top5000 
ON (top_albums.artist = top5000.artist AND top_albums.year = top5000.year) 
WHERE (top_albums.artist = ? AND top5000.artist = ?) 
ORDER BY top_albums.year, top_albums.position;


