-----for admin table----

INSERT INTO admin (email,password) VALUES ('admin@gmail.com', '1234');


----for supplier table----
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (1, '123567668','Arijit','123','debnathari@34');
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (3, '1234567890','Asmit','554','Tushar@55');
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (4, '6797389083','Arup','554','Arup@66');
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (5, '6383274798','Udayan','778','Udayan@55');
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (6, '6368386878','Rajdweep','445','Raj@78');
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (7, '2347890961','Aruneet','111','Aruneet@89');
INSERT INTO supplier (id, contact_info, name, password,email) VALUES (8, '1234567890','Asmit','554','asmit@acmecorp.com');

----for pacakge table----
INSERT INTO package (id, address, package_name, supplier_id, quantity) VALUES (1, 'Pune','Football',1,5);
INSERT INTO package (id, address, package_name, supplier_id, quantity) VALUES (3, 'Delhi','Rings',3,4);
INSERT INTO package (id, address, package_name, supplier_id, quantity) VALUES (4, 'Kolkata','AC',4,7);
INSERT INTO package (id, address, package_name, supplier_id, quantity) VALUES (5, 'Mumbai','Kuchina',5,1);
INSERT INTO package (id, address, package_name, supplier_id, quantity) VALUES (6, 'Chandigarh','Jeans',6,3);
INSERT INTO package (id, address, package_name, supplier_id, quantity) VALUES (7, 'Agra','Car',8,4);



-----drop coloumn----
ALTER TABLE pacakge
DROP COLUMN details;


-----update pacakge table------
UPDATE `supply`.`package` SET `address` = 'Pune' WHERE (`id` = '1');
UPDATE `supply`.`package` SET `address` = 'Delhi' WHERE (`id` = '3');
UPDATE `supply`.`package` SET `address` = 'Kolkata' WHERE (`id` = '4');
UPDATE `supply`.`package` SET `address` = 'Mumbai' WHERE (`id` = '5');
UPDATE `supply`.`package` SET `address` = 'Chandigarh' WHERE (`id` = '6');
UPDATE `supply`.`package` SET `address` = 'Agra' WHERE (`id` = '7');

