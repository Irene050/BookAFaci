import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login'
import Userselect from './Pages/Userselect'
import AdminDashboard from './Pages/AdminDashboard';
import AdminFacilities from './Pages/AdminFacilities';
import AdminUsers from './Pages/AdminUsers';
import AdminBookings from './Pages/AdminBookings';

import Landing from './Pages/LandingPage';
import UserDashboard from './Pages/UserDashboard';
import UserFacilities from './Pages/UserFacilities';
import UserBookings from './Pages/UserBookings';

import ProtectedRoute from './Routeprotection';
import NotFound from './Pages/NotFound';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-select" element={<Userselect />} />
        <Route path="/UserDashboard" element={<ProtectedRoute allowedRoles={['External', 'Internal']}><UserDashboard /></ProtectedRoute>} />
        <Route path="/UserFacilities" element={<ProtectedRoute allowedRoles={['External', 'Internal']}><UserFacilities /></ProtectedRoute>} />
        <Route path="/UserBookings" element={<ProtectedRoute allowedRoles={['External', 'Internal']}><UserBookings /></ProtectedRoute>} />

        {/*ADMIN*/}
        {/*
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
        <Route path="/facilities" element={<ProtectedRoute allowedRoles={['admin']}><Facilities /></ProtectedRoute>} />
        */}

        <Route path="/admindash" element={<AdminDashboard />} />
        <Route path="/adminfaci" element={<AdminFacilities />} />
        <Route path="/adminusers" element={<AdminUsers />} />
        <Route path="/adminbks" element={<AdminBookings />} />
      </Routes>
    </div>
  )
}

<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
/>

export default App
