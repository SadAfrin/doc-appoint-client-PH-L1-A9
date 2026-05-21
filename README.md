# DocAppoint - Doctor Appointment Manager

**DocAppoint** is a comprehensive Doctor Appointment Booking System designed to bridge the gap between patients and healthcare professionals. Users can browse, search, and book appointments securely with a seamless dashboard experience.

## 🚀 Live Site URL
https://doc-appoint-client-indol.vercel.app/

## 📌 Key Features
* **Secure Authentication:** Integrated with **Better Auth** using JWT and Google OAuth for safe and reliable user access.
* **Dynamic Doctor Discovery:** Browse available doctors with real-time search functionality and view detailed professional profiles.
* **Personalized Dashboard:** A private user area to manage, update, or delete existing appointments and edit profile information.
* **Responsive & Modern UI:** Designed with a clean layout, interactive components, and real-time toast notifications for all user actions.
* **Optimized Performance:** Implemented loading spinners and SEO-friendly metadata for a smooth and discoverable browsing experience.

## 🛠 Technology Stack
* **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion, React Toastify.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB.
* **Authentication:** Better Auth (JWT + Google Provider).
* **Deployment:** Vercel (Client) & Render (Server).

## ⚙️ Core Functionality
* **Booking Management:** Real-time CRUD operations on appointments stored in MongoDB.
* **Authentication Flow:** Protected routes ensured with token verification; prevents unauthorized access and handles session persistence on page reload.
* **Search & Filter:** Dynamic search feature on the "All Appointments" page to find doctors by name.
* **Data Integrity:** Controlled update forms ensuring user email and doctor details remain immutable for security.

## 🚀 How to Run Locally
1. Clone the repository: `git clone https://github.com/SadAfrin/doc-appoint-client-PH-L1-A9`
2. Install dependencies: `npm install`
3. Create a `.env` file and add:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
4. Run the development server: `npm run dev`

---
