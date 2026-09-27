USE facility_management;

INSERT INTO facilities (id, name, facility_code, location, facility_type, status, cleanliness_score, last_inspection_date) VALUES
  (1, 'North District Medical Clinic', 'FAC-001', 'Nairobi, North District', 'Clinic', 'Active', 92, '2026-09-18'),
  (2, 'Mombasa Cold Storage', 'FAC-002', 'Mombasa, Port Road', 'Warehouse', 'Active', 78, '2026-09-20'),
  (3, 'Cedar Learning Centre', 'FAC-003', 'Kisumu, Central Ward', 'Training Center', 'Active', 88, '2026-09-16'),
  (4, 'Western Public Health Lab', 'FAC-004', 'Kakamega, Hospital Road', 'Laboratory', 'Active', 84, '2026-09-21'),
  (5, 'Central Operations Office', 'FAC-005', 'Nakuru, Civic Centre', 'Office', 'Active', 95, '2026-09-17'),
  (6, 'Riverside Community Hub', 'FAC-006', 'Eldoret, Riverside', 'Community Center', 'Under Maintenance', 72, '2026-09-13'),
  (7, 'Eastgate Family Clinic', 'FAC-007', 'Nairobi, Eastlands', 'Clinic', 'Active', 89, '2026-09-22'),
  (8, 'Highland Supply Depot', 'FAC-008', 'Nyeri, Industrial Area', 'Warehouse', 'Active', 81, '2026-09-19'),
  (9, 'Lakeview Skills Centre', 'FAC-009', 'Kisumu, Lake Road', 'Training Center', 'Active', 90, '2026-09-15'),
  (10, 'Coastal Diagnostics Unit', 'FAC-010', 'Mombasa, Tudor', 'Laboratory', 'Active', 86, '2026-09-23'),
  (11, 'Westlands Admin Office', 'FAC-011', 'Nairobi, Westlands', 'Office', 'Inactive', 0, NULL),
  (12, 'Greenfield Outreach Centre', 'FAC-012', 'Meru, Greenfield', 'Community Center', 'Active', 93, '2026-09-24')
ON DUPLICATE KEY UPDATE
  name = VALUES(name), location = VALUES(location), facility_type = VALUES(facility_type),
  status = VALUES(status), cleanliness_score = VALUES(cleanliness_score), last_inspection_date = VALUES(last_inspection_date);

INSERT INTO inspections (id, facility_id, inspector_name, inspection_date, cleanliness_score, odor_score, waste_level, water_availability, remarks, status) VALUES
  (1, 1, 'Evelyn Wanjiku', '2026-09-18', 92, 12, 'Low', 1, 'Good hygiene practice. Refresh the waste log at the nurses station.', 'Completed'),
  (2, 1, 'Peter Kamau', '2026-08-18', 89, 16, 'Low', 1, 'Routine review completed with no major findings.', 'Completed'),
  (3, 2, 'Daniel Otieno', '2026-09-20', 78, 42, 'Moderate', 1, 'Improve pallet spacing and follow up on a minor odor concern.', 'Needs Follow-up'),
  (4, 2, 'Lydia Mwangi', '2026-08-20', 81, 35, 'Moderate', 1, 'Cold room labels were updated during the visit.', 'Completed'),
  (5, 3, 'Grace Njeri', '2026-09-16', 88, 10, 'Low', 1, 'Training rooms were clean; replace two worn notice boards.', 'Completed'),
  (6, 3, 'James Kiptoo', '2026-08-16', 86, 14, 'Low', 1, 'Good condition across classrooms and shared spaces.', 'Completed'),
  (7, 4, 'Sarah Achieng', '2026-09-21', 84, 22, 'Low', 1, 'Recheck specimen storage temperature log next visit.', 'Needs Follow-up'),
  (8, 4, 'Moses Barasa', '2026-08-21', 87, 18, 'Low', 1, 'Safety and cleaning records were complete.', 'Completed'),
  (9, 5, 'Anne Kariuki', '2026-09-17', 95, 8, 'Low', 1, 'Excellent housekeeping and clear evacuation routes.', 'Completed'),
  (10, 5, 'Brian Maina', '2026-08-17', 94, 10, 'Low', 1, 'Routine inspection passed.', 'Completed'),
  (11, 6, 'David Kiptoo', '2026-09-13', 72, 48, 'High', 0, 'Water supply was unavailable in the east wing; maintenance ticket raised.', 'Needs Follow-up'),
  (12, 6, 'Mercy Chebet', '2026-08-13', 76, 40, 'Moderate', 1, 'Repair two washroom taps and review waste collection schedule.', 'Completed'),
  (13, 7, 'Evelyn Wanjiku', '2026-09-22', 89, 14, 'Low', 1, 'Clinic areas met cleanliness standards.', 'Completed'),
  (14, 7, 'Peter Kamau', '2026-08-22', 87, 18, 'Low', 1, 'Minor supply issue was resolved during the visit.', 'Completed'),
  (15, 8, 'Lydia Mwangi', '2026-09-19', 81, 28, 'Moderate', 1, 'Clear the south loading aisle and update the cleaning rota.', 'Needs Follow-up'),
  (16, 8, 'Daniel Otieno', '2026-08-19', 83, 24, 'Low', 1, 'Storage areas were generally orderly.', 'Completed'),
  (17, 9, 'James Kiptoo', '2026-09-15', 90, 9, 'Low', 1, 'Good ventilation and clean shared work areas.', 'Completed'),
  (18, 9, 'Grace Njeri', '2026-08-15', 88, 12, 'Low', 1, 'All rooms were ready for the new training cycle.', 'Completed'),
  (19, 10, 'Sarah Achieng', '2026-09-23', 86, 20, 'Low', 1, 'Review chemical cabinet labeling at the next visit.', 'Completed'),
  (20, 10, 'Moses Barasa', '2026-08-23', 85, 19, 'Low', 1, 'Routine diagnostics unit inspection passed.', 'Completed'),
  (21, 11, 'Anne Kariuki', '2026-08-12', 80, 20, 'Low', 1, 'Office closed for refurbishment; no current operations.', 'Completed'),
  (22, 11, 'Brian Maina', '2026-07-12', 82, 18, 'Low', 1, 'Site status confirmed as inactive.', 'Completed'),
  (23, 12, 'Mercy Chebet', '2026-09-24', 93, 10, 'Low', 1, 'Outreach rooms were clean and water was available.', 'Completed'),
  (24, 12, 'David Kiptoo', '2026-08-24', 91, 12, 'Low', 1, 'Routine check completed with no follow-up needed.', 'Completed')
ON DUPLICATE KEY UPDATE
  facility_id = VALUES(facility_id), inspector_name = VALUES(inspector_name), inspection_date = VALUES(inspection_date),
  cleanliness_score = VALUES(cleanliness_score), odor_score = VALUES(odor_score), waste_level = VALUES(waste_level),
  water_availability = VALUES(water_availability), remarks = VALUES(remarks), status = VALUES(status);

INSERT INTO complaints (id, facility_id, title, description, complaint_type, priority, status, reported_by) VALUES
  (1, 1, 'Sharps bin replacement', 'One treatment room bin is close to its fill line and needs replacement.', 'Safety', 'High', 'Open', 'Clinic supervisor'),
  (2, 2, 'Cold room odor', 'A mild odor was noticed near the rear cold room drain.', 'Maintenance', 'Medium', 'In Progress', 'Warehouse lead'),
  (3, 3, 'Classroom notice boards', 'Two notice boards have loose edges and should be repaired.', 'Maintenance', 'Low', 'Open', 'Training coordinator'),
  (4, 4, 'Specimen log review', 'The temperature log needs a second signature on evening shifts.', 'Safety', 'High', 'In Progress', 'Lab technician'),
  (5, 5, 'No current complaints', 'Routine report recorded for tracking.', 'Other', 'Low', 'Resolved', 'Office coordinator'),
  (6, 6, 'East wing water outage', 'Water is not reaching the east wing washrooms.', 'Maintenance', 'Critical', 'Open', 'Community liaison'),
  (7, 7, 'Soap dispenser refill', 'The waiting-area dispenser needs a refill.', 'Supplies', 'Low', 'Resolved', 'Reception team'),
  (8, 8, 'Loading aisle obstruction', 'Empty pallets are narrowing the south loading aisle.', 'Safety', 'High', 'Open', 'Shift supervisor'),
  (9, 9, 'Ventilation check', 'Request a check of airflow in the small meeting room.', 'Maintenance', 'Medium', 'In Progress', 'Course facilitator'),
  (10, 10, 'Chemical cabinet labels', 'Replace faded labels on two storage bottles.', 'Safety', 'Medium', 'Open', 'Lab assistant'),
  (11, 11, 'Refurbishment access', 'Access remains restricted while the office is being refurbished.', 'Other', 'Low', 'Resolved', 'Facilities team'),
  (12, 12, 'Outdoor bin cover', 'Replace the cracked lid on the visitor entrance bin.', 'Cleanliness', 'Low', 'Open', 'Outreach worker')
ON DUPLICATE KEY UPDATE
  facility_id = VALUES(facility_id), title = VALUES(title), description = VALUES(description), complaint_type = VALUES(complaint_type),
  priority = VALUES(priority), status = VALUES(status), reported_by = VALUES(reported_by);