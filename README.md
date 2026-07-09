# 🩺 DocAppoint — Doctor Appointment Manager

**DocAppoint** is a comprehensive Doctor Appointment Booking System designed to bridge the gap between patients and healthcare professionals. Users can browse, search, and book appointments securely with a seamless dashboard experience.

🌐 **Live Site:** [doc-appoint-client-indol.vercel.app](https://doc-appoint-client-indol.vercel.app/)

---

## 📖 Overview

DocAppoint streamlines the process of finding and booking doctor appointments. Patients can search for doctors, view detailed profiles, and manage their bookings through a private, authenticated dashboard — all backed by a secure Node.js/Express API and MongoDB database.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | Frontend framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Toastify | Toast notifications |
| Node.js | Backend runtime |
| Express.js | Backend server / REST API |
| MongoDB | Database |
| Better Auth | Authentication (JWT + Google OAuth) |
| Vercel | Client deployment |
| Render | Server deployment |

---

## ✨ Core Features

- **Secure Authentication** — integrated with Better Auth using JWT and Google OAuth for safe, reliable user access
- **Dynamic Doctor Discovery** — browse available doctors with real-time search and view detailed professional profiles
- **Personalized Dashboard** — private user area to manage, update, or delete existing appointments, and edit profile information
- **Responsive & Modern UI** — clean layout, interactive components, and real-time toast notifications for all user actions
- **Optimized Performance** — loading spinners and SEO-friendly metadata for a smooth, discoverable browsing experience

---

## ⚙️ Core Functionality

| Area | Details |
|------|---------|
| Booking Management | Real-time CRUD operations on appointments stored in MongoDB |
| Authentication Flow | Protected routes with token verification; prevents unauthorized access and handles session persistence on page reload |
| Search & Filter | Dynamic search on the "All Appointments" page to find doctors by name |
| Data Integrity | Controlled update forms ensuring user email and doctor details remain immutable for security |

---

## 📦 Dependencies (Key Packages)

- `next` — React framework
- `express` — backend server
- `mongodb` / `mongoose` — database connection & modeling
- `better-auth` — authentication (JWT + Google provider)
- `tailwindcss` — utility-first styling
- `framer-motion` — animations
- `react-toastify` — toast notifications

> Full list available in `package.json` for both client and server.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 🏃 Run Locally

**Clone the repository:**
```bash
git clone https://github.com/SadAfrin/doc-appoint-client-PH-L1-A9
cd doc-appoint-client-PH-L1-A9
```

**Install dependencies:**
```bash
npm install
```

**Set up environment variables:**
Create a `.env` file in the root directory and add the variables listed in the [Environment Variables](#️-environment-variables) section above.

**Run the development server:**
```bash
npm run dev
```
## 🔗 Links

- 🌐 Live Site: [doc-appoint-client-indol.vercel.app](https://doc-appoint-client-indol.vercel.app/)
- 💻 Client Repo: [github.com/SadAfrin/doc-appoint-client-PH-L1-A9](https://github.com/SadAfrin/doc-appoint-client-PH-L1-A9)
- 🗄️ Server Repo: [github.com/SadAfrin/doc-appoint-server](https://github.com/SadAfrin/doc-appoint-server)
The app will be available at `http://localhost:3000`.

> ⚠️ Note: This is the client repo. For full functionality, also run the corresponding server with its own `.env` configuration (deployed on Render).

---
