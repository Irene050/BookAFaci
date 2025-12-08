<div align="center">
  <img src="frontend/BookAFaci/public/Bookafaci.svg" alt="BookAFaci Logo" width="200"/>
  
  # BookAFaci
  
  ### Facility and Equipment Booking System
  *Streamlining reservations for Ateneo De Naga University's Physical Plant Administration*
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  
</div>

---

## 📖 About

**BookAFaci** is a comprehensive booking management system designed to streamline facility and equipment reservations at Ateneo De Naga University. The platform provides an efficient, user-friendly interface for managing all reservation needs with real-time availability tracking.

## ✨ Key Features

- **🏢 Facility Management** - Browse and book university facilities with real-time availability, capacity information, and amenities
- **🎛️ Equipment Reservation** - Reserve equipment like projectors, sound systems, and other resources with availability tracking
- **📅 Real-time Calendar** - Interactive calendar
- **🔒 Secure Authentication** - Role-based access control for internal and external users with JWT authentication
- **📊 Admin Dashboard** - Comprehensive admin panel for managing bookings, users, facilities, and equipment with statistics tracking
- **📱 Mobile Responsive** - Fully responsive design optimized for desktop, tablet, and mobile devices
- **✅ Comprehensive Booking Management** - Create, edit, and cancel bookings with status tracking (pending, approved, completed, cancelled)

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- React Router
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

**Deployment:**
- Vercel

## 👥 Development Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ctrl-fmadera">
        <img src="https://avatars.githubusercontent.com/u/189200794?v=4" width="100px;" alt="Frances Yvonne P. Madera"/>
        <br />
        <sub><b>Frances Yvonne P. Madera</b></sub>
      </a>
      <br />
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Irene050">
        <img src="https://avatars.githubusercontent.com/u/189200811?v=4" width="100px;" alt="Irene B. Artiaga"/>
        <br />
        <sub><b>Irene B. Artiaga</b></sub>
      </a>
      <br />
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/J3sterlir">
        <img src="https://avatars.githubusercontent.com/u/108736019?v=4" width="100px;" alt="Jeremiah Martin D. Lirag"/>
        <br />
        <sub><b>Jeremiah Martin D. Lirag</b></sub>
      </a>
      <br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/marijoe-cloud">
        <img src="https://avatars.githubusercontent.com/u/226326465?v=4" width="100px;" alt="Marijoe R. San Juan"/>
        <br />
        <sub><b>Marijoe R. San Juan</b></sub>
      </a>
      <br />
      <sub>Frontend Developer</sub>
    </td>
  </tr>
</table>

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Irene050/BookAFaci.git
cd BookAFaci
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend/BookAFaci
npm install
```

4. Set up environment variables
```bash
# Backend (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Frontend (.env)
VITE_API_URL=your_backend_api_url
```

5. Run the application
```bash
# Backend
cd backend
npm start

# Frontend (in a new terminal)
cd frontend/BookAFaci
npm run dev
```

## 📝 License

This project is licensed under the MIT License.

---

<div align="center">
  <p><i>"It's always easy with BookAFaci"</i></p>
  <p>© 2024 BookAFaci. All rights reserved.</p>
</div>
