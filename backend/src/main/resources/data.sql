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
