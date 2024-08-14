-- Admin
INSERT INTO admin (email,password) VALUES ('admin@gmail.com', 'password');


-- Suppliers
insert into supplier (name, email, password, contact_info, role) values
('Arun Kumar', 'arun.kumar@example.com', 'password', '9876543210', 'supplier'),
('Sunita Sharma', 'sunita.sharma@example.com', 'password', '9876543211', 'supplier'),
('Rajesh Patel', 'rajesh.patel@example.com', 'password', '9876543212', 'supplier'),
('Meera Nair', 'meera.nair@example.com', 'password', '9876543213', 'supplier'),
('Vikram Singh', 'vikram.singh@example.com', 'password', '9876543214', 'supplier'),
('Neha Agarwal', 'neha.agarwal@example.com', 'password', '9876543215', 'supplier'),
('Rajeshwari Reddy', 'rajeshwari.reddy@example.com', 'password', '9876543216', 'supplier'),
('Ajay Gupta', 'ajay.gupta@example.com', 'password', '9876543217', 'supplier'),
('Sonia Malhotra', 'sonia.malhotra@example.com', 'password', '9876543218', 'supplier'),
('Ravi Desai', 'ravi.desai@example.com', 'password', '9876543219', 'supplier');


-- Packages
insert into package (package_name, address, quantity, supplier_id) values
('basic package', '15, shivaji nagar, pune, maharashtra', 10, 1),
('deluxe package', '22, ekta nagar, mumbai, maharashtra', 5, 1),
('standard package', '77, gomti nagar, lucknow, uttar pradesh', 20, 1),
('premium package', '44, vijay nagar, indore, madhya pradesh', 8, 2),
('economy package', '101, sector 15, chandigarh', 15, 2),
('luxury package', '12, new colony, surat, gujarat', 25, 3),
('compact package', '9, brigade road, bangalore, karnataka', 12, 3),
('gift package', '88, thiruvananthapuram, kerala', 18, 4),
('holiday package', '23, marathahalli, bangalore, karnataka', 7, 4),
('summer package', '56, sector 18, noida, uttar pradesh', 10, 5),
('winter package', '78, banjara hills, hyderabad, telangana', 9, 5),
('autumn package', '43, model town, delhi', 14, 5),
('spring package', '31, new alipur, kolkata, west bengal', 21, 6),
('valentine package', '14, ramanthapur, hyderabad, telangana', 16, 7),
('anniversary package', '52, kasaragod, kerala', 5, 7),
('birthday package', '8, vellore, tamil nadu', 13, 8),
('congratulations package', '91, vashi, navi mumbai, maharashtra', 11, 8),
('thank you package', '3, tirunelveli, tamil nadu', 8, 8),
('new year package', '45, rajouri garden, delhi', 22, 9),
('graduation package', '60, pusa road, delhi', 6, 9),
('housewarming package', '27, ernakulam, kerala', 17, 10),
('get well package', '90, sector 22, gurgaon, haryana', 19, 10);


------update packages-------
UPDATE package SET price_per_unit = 6200  WHERE id = 1;
UPDATE package SET price_per_unit = 9600  WHERE id = 2;
UPDATE package SET price_per_unit = 8400  WHERE id = 3;
UPDATE package SET price_per_unit = 10000  WHERE id = 4;
UPDATE package SET price_per_unit = 5500  WHERE id = 5;
UPDATE package SET price_per_unit = 9400  WHERE id = 6;
UPDATE package SET price_per_unit = 5700  WHERE id = 7;
UPDATE package SET price_per_unit = 6000  WHERE id = 8;
UPDATE package SET price_per_unit = 8700  WHERE id = 9;
UPDATE package SET price_per_unit = 2300  WHERE id = 10;
UPDATE package SET price_per_unit = 4400  WHERE id = 11;
UPDATE package SET price_per_unit = 2200  WHERE id = 12;
UPDATE package SET price_per_unit = 1500  WHERE id = 13;
UPDATE package SET price_per_unit = 6600  WHERE id = 14;
UPDATE package SET price_per_unit = 2200  WHERE id = 15;
UPDATE package SET price_per_unit = 1000  WHERE id = 16;
UPDATE package SET price_per_unit = 2500  WHERE id = 17;
UPDATE package SET price_per_unit = 1200  WHERE id = 18;
UPDATE package SET price_per_unit = 8800  WHERE id = 19;
UPDATE package SET price_per_unit = 9800  WHERE id = 20;
UPDATE package SET price_per_unit = 3400  WHERE id = 21;
UPDATE package SET price_per_unit = 5600  WHERE id = 22;

------update supplier-----
UPDATE supplier SET discount = 10  WHERE id = 1;
UPDATE supplier SET discount = 11  WHERE id = 2;
UPDATE supplier SET discount = 7  WHERE id = 3;
UPDATE supplier SET discount = 9  WHERE id = 4;
UPDATE supplier SET discount = 6  WHERE id = 5;
UPDATE supplier SET discount = 22  WHERE id = 6;
UPDATE supplier SET discount = 13  WHERE id = 7;
UPDATE supplier SET discount = 18  WHERE id = 8;
UPDATE supplier SET discount = 19  WHERE id = 9;
UPDATE supplier SET discount = 11  WHERE id = 10;
UPDATE supplier SET discount = 5  WHERE id = 11;