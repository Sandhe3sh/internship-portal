# Internship Portal

Full-stack internship management portal built with React.js, Spring Boot, and MySQL.

## Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.8+

## Setup

### 1. Database
MySQL database is auto-created. Update credentials in `backend/src/main/resources/application.properties`:
```
spring.datasource.username=root
spring.datasource.password=root
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on http://localhost:8080

**Default Admin Account** (auto-created on first run):
- Email: `admin@portal.com`
- Password: `admin123`

### 3. Frontend
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/internships | Authenticated |
| POST | /api/internships | Admin |
| PUT | /api/internships/{id} | Admin |
| DELETE | /api/internships/{id} | Admin |
| POST | /api/applications/apply/{id} | Student |
| GET | /api/applications/my | Student |
| GET | /api/applications/all | Admin |
| PUT | /api/applications/{id}/status | Admin |
| GET | /api/users | Admin |

## Features
- JWT-based authentication
- Role-based access (Admin / Student)
- Eligibility check by department and batch
- External application link tracking
- Admin: full CRUD on internships, view/manage students and applications
- Student: browse, filter, apply, track applications
