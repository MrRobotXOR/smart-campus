Smart Campus

AI-powered Campus Management Platform for Students, Club Heads, and HODs.

7

A modern full-stack web application that streamlines campus event management with secure role-based authentication, event approval workflow, participant management, and department-level administration.

Features
Student

Student Registration & Login

Browse Approved Events

View Event Details

Register for Events

Profile Management

Club Head

Secure Login with Secret Code

Create New Events

Edit/Delete Own Events

View Event Status

Manage Participants

HOD

Secure Login with Secret Code

Review Pending Events

Approve or Reject Events

View Approved Events

View Rejected Events

Recent Activity Dashboard

Tech Stack

Layer

	

Technology




Frontend

	

React + Vite




Backend

	

Node.js + Express




Database

	

MongoDB




Authentication

	

JWT




Password Security

	

bcrypt




File Upload

	

Multer




Icons

	

React Icons

Project Structure
smart-campus/
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── api/
│   │   │   └── store/
│   │
│   └── server/
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── middleware/
│       │   ├── models/
│       │   └── utils/
│       └── uploads/
│
├── package.json
└── README.md
Authentication System

Three user roles are supported.

Role

	

Access




Student

	

Login/Register




Club Head

	

Secret Code Required




HOD

	

Secret Code Required

Secret Code Protection

Faculty accounts require authorization.

Role

	

Requirement




Club Head

	

CLUB_HEAD_SECRET




HOD

	

HOD_SECRET

Event Workflow

Club Head creates an event.

Event status becomes Pending.

HOD reviews the request.

HOD approves or rejects the event.

Approved events become visible to students.

Dashboard Highlights
6
Student Dashboard

Upcoming Events

Registered Events

Notifications

Club Dashboard

My Events

Event Status

Participants

HOD Dashboard

Analytics Cards

Recent Activity

Latest Pending Events

View All Pending

API Overview
Authentication

Method

	

Endpoint




POST

	

/api/auth/register




POST

	

/api/auth/login




GET

	

/api/auth/me

Events

Method

	

Endpoint




GET

	

/api/events




GET

	

/api/events/:id




POST

	

/api/events




PUT

	

/api/events/:id




DELETE

	

/api/events/:id

HOD

Method

	

Endpoint




GET

	

/api/events/pending




PATCH

	

/api/events/:id/approve




PATCH

	

/api/events/:id/reject

Environment Variables

Create .env inside apps/server.

PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/smart-campus

JWT_SECRET=your_secret_key

CLUB_HEAD_SECRET=club123

HOD_SECRET=hod123
Installation
Clone Repository
git clone https://github.com/your-username/smart-campus.git

cd smart-campus
Install Dependencies
pnpm install
Start Development
pnpm dev

Default URLs

Frontend: http://localhost:5173

Backend: http://localhost:5000

Screenshots

Add screenshots after deployment.

Page

	

Screenshot




Login

	

assets/login.png




Register

	

assets/register.png




Student Dashboard

	

assets/student-dashboard.png




Club Dashboard

	

assets/club-dashboard.png




HOD Dashboard

	

assets/hod-dashboard.png

Security Features

JWT Authentication

Password Hashing (bcrypt)

Role-Based Authorization

Faculty Secret Code Verification

Protected Routes

Secure API Middleware

Future Improvements

Email Verification

QR Attendance

Event Certificates

Admin Panel

Analytics Dashboard

Mobile App
