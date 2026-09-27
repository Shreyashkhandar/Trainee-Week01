CREATE DATABASE IF NOT EXISTS facility_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE facility_management;

CREATE TABLE IF NOT EXISTS facilities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(140) NOT NULL,
  facility_code VARCHAR(24) NOT NULL,
  location VARCHAR(180) NOT NULL,
  facility_type ENUM('Clinic', 'Warehouse', 'Training Center', 'Laboratory', 'Office', 'Community Center') NOT NULL,
  status ENUM('Active', 'Under Maintenance', 'Inactive') NOT NULL DEFAULT 'Active',
  cleanliness_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
  last_inspection_date DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY facilities_code_unique (facility_code),
  KEY facilities_status_type_idx (status, facility_type),
  KEY facilities_location_idx (location),
  CONSTRAINT facilities_cleanliness_range CHECK (cleanliness_score >= 0 AND cleanliness_score <= 100)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inspections (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  facility_id BIGINT UNSIGNED NOT NULL,
  inspector_name VARCHAR(120) NOT NULL,
  inspection_date DATE NOT NULL,
  cleanliness_score TINYINT UNSIGNED NOT NULL,
  odor_score TINYINT UNSIGNED NOT NULL,
  waste_level ENUM('Low', 'Moderate', 'High') NOT NULL,
  water_availability TINYINT(1) NOT NULL DEFAULT 1,
  remarks TEXT NOT NULL,
  status ENUM('Pending', 'Completed', 'Needs Follow-up') NOT NULL DEFAULT 'Completed',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY inspections_facility_date_idx (facility_id, inspection_date),
  KEY inspections_status_date_idx (status, inspection_date),
  CONSTRAINT inspections_facility_fk FOREIGN KEY (facility_id)
    REFERENCES facilities (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT inspections_cleanliness_range CHECK (cleanliness_score <= 100),
  CONSTRAINT inspections_odor_range CHECK (odor_score <= 100),
  CONSTRAINT inspections_water_boolean CHECK (water_availability IN (0, 1))
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS complaints (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  facility_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  complaint_type ENUM('Cleanliness', 'Safety', 'Maintenance', 'Supplies', 'Other') NOT NULL DEFAULT 'Other',
  priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Medium',
  status ENUM('Open', 'In Progress', 'Resolved') NOT NULL DEFAULT 'Open',
  reported_by VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY complaints_facility_status_idx (facility_id, status),
  KEY complaints_priority_status_idx (priority, status),
  CONSTRAINT complaints_facility_fk FOREIGN KEY (facility_id)
    REFERENCES facilities (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;