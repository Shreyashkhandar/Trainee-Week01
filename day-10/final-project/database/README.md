# Database layer

This folder contains the schema and seed data for the `facility_management` database.

## Files
- `schema.sql` creates the database, tables, constraints, and indexes.
- `seed.sql` inserts sample facilities, inspections, and complaints for demo use.

## Database setup
```bash
mysql -u root -p < day-10/final-project/database/schema.sql
mysql -u root -p < day-10/final-project/database/seed.sql
```

## Database name
`facility_management`

## Tables
- `facilities`
- `inspections`
- `complaints`

## Relationships
- One facility has many inspections.
- One facility has many complaints.

## Verification checklist
- Database exists
- Tables are present
- Foreign key relationships are enforced
- Seed records are populated
