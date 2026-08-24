# EventHub Frontend

EventHub is a full-stack event management and ticketing platform. This repository contains the **frontend application**, built to provide distinct experiences for three roles: regular users, organizers, and administrators.

<!-- Logo -->
<p align="center">
  <img src="docs/assets/logo.svg" alt="EventHub Logo" width="160" />
</p>

---

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Authentication state managed via React Context
- Persisted authentication state using Local Storage
- Protected routes
- Role-based route protection
- Axios request/response interceptors
- Automatic logout when the API returns an unauthorized response

### Users

- Browse events
- View event details
- Purchase tickets
- View purchased tickets (My Tickets)
- View individual ticket details
- Cancel tickets
- Paginated event and ticket listings

### Organizers

- Dedicated organizer area
- View own events
- Create, edit, and publish events
- Cancel events
- View event details
- View tickets purchased for owned events
- Check in attendees using ticket codes
- Paginated event ticket listings

### Admin

- Dedicated admin dashboard with its own layout and sidebar navigation
- User management: view all users, filter by role, pagination
- Create users and organizers
- Total user count displayed on the dashboard
- Protected admin routes

The admin dashboard also includes UI placeholders for upcoming modules:

- Events — Coming Soon
- Tickets — Coming Soon
- Analytics — Coming Soon
- Settings — Coming Soon

These modules are not yet implemented.

---

## Tech Stack

| Category    | Technology   |
| ----------- | ------------ |
| Library     | React        |
| Language    | TypeScript   |
| Build Tool  | Vite         |
| Routing     | React Router |
| HTTP Client | Axios        |
| Styling     | CSS          |

---

## Application Architecture

The frontend is organized around a role-based structure, with clearly separated concerns for pages, reusable components, API services, and application state.

```
src/
├── assets/
├── components/
│   ├── admin/
│   ├── common/
│   ├── events/
│   └── tickets/
├── config/
├── contexts/
├── layouts/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── organizer/
│   ├── tickets/
│   ├── AboutPage.tsx
│   ├── EventDetailsPage.tsx
│   ├── EventsPage.tsx
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
├── routes/
├── services/
│   └── api/
├── types/
├── utils/
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

- **components** — UI building blocks grouped by domain (admin, common, events, tickets)
- **pages** — Route-level views, including role-specific subfolders for admin, auth, and organizer
- **contexts** — Application-wide state, including authentication state
- **services/api** — Centralized API communication modules
- **routes** — Route definitions and route protection logic
- **layouts** — Shared page layouts (including the dedicated admin layout)
- **config**, **types**, **utils** — Configuration, shared TypeScript types, and helper utilities

---

## Routing

**Public routes**

| Route              | Description   |
| ------------------ | ------------- |
| `/`                | Home          |
| `/events`          | Browse events |
| `/events/:eventId` | Event details |
| `/about`           | About page    |
| `/login`           | Login         |
| `/register`        | Register      |

**Authenticated user routes**

| Route                   | Description              |
| ----------------------- | ------------------------ |
| `/my-tickets`           | User's purchased tickets |
| `/my-tickets/:ticketId` | Ticket details           |

**Organizer routes**

| Route                         | Description          |
| ----------------------------- | -------------------- |
| `/my-events`                  | Organizer's events   |
| `/my-events/:eventId`         | Event details        |
| `/my-events/:eventId/edit`    | Edit event           |
| `/my-events/:eventId/tickets` | Tickets for an event |

**Admin routes**

| Route          | Description     |
| -------------- | --------------- |
| `/admin`       | Admin dashboard |
| `/admin/users` | User management |

All routes are protected according to authentication state, and role-based authorization restricts access to organizer and admin routes.

---

## API Integration

API communication is centralized using Axios, with separate service modules per domain:

- Authentication
- Events
- Tickets
- Admin

The Axios client:

- Uses a configurable API base URL
- Automatically attaches the JWT access token to outgoing requests
- Handles API errors centrally
- Detects unauthorized responses
- Triggers automatic logout when the access token is no longer valid

### Pagination

Pagination is implemented across the following lists:

- Events
- My Tickets
- Organizer Event Tickets
- Admin Users

The API supplies pagination metadata consumed by the frontend, including:

- `currentPage`
- `totalPages`
- `totalElements`
- `hasPrevPage`
- `hasNextPage`

---

## Authentication & Authorization

Authentication state is managed through React Context and persisted in Local Storage. Access to routes is controlled through:

- **Protected routes** — require an authenticated session
- **Role-based route protection** — restrict access based on user role (`USER`, `ORGANIZER`, `ADMIN`)

Axios interceptors attach the JWT access token to each request and monitor responses for unauthorized (401) errors, automatically logging the user out when the token is invalid or expired.

---

## Screenshots

|                                Event Details                                 |                               My Tickets                               |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| <img src="/docs/assets/event-details.png" alt="Event Details" width="400" /> | <img src="/docs/assets/my-tickets.png" alt="My Tickets" width="400" /> |

|                                  Organizer Dashboard                                  |                                Organizer Event Tickets                                 |
| :-----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
| <img src="/docs/assets/organizer-events.png" alt="Organizer Dashboard" width="400" /> | <img src="/docs/assets/event-tickets.png" alt="Organizer Event Tickets" width="400" /> |

|                                 Admin Dashboard                                  |                             Admin Dashboard                              |
|:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|
| <img src="/docs/assets/admin_dashboard.png" alt="Admin Dashboard" width="400" /> | <img src="/docs/assets/admin-dashboard.png" alt="Admin Dashboard" width="400" /> |

---

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=<backend-api-url>
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## Backend Repository

This repository documents the **frontend application only**. EventHub's backend is maintained in a separate repository.

Backend repository: https://github.com/gemmy404/eventhub.git

The backend is built with NestJS using a microservices architecture, with PostgreSQL, Prisma, Kafka, and Docker.

---
