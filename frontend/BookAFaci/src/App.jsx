import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login'
import Userselect from './Pages/Userselect'
import AdminDashboard from './Pages/AdminDashboard';
import AdminFacilities from './Pages/AdminFacilities';
import AdminUsers from './Pages/AdminUsers';
import AdminBookings from './Pages/AdminBookings';

import ProtectedRoute from './Routeprotection';
import Landing from './Pages/landing';
import EXTdash from './Pages/DashboardEXT';
import INTdash from './Pages/DashboardINT';
import EXTfaci from './Pages/FacilitiesEXT';
import INTfaci from './Pages/FacilitiesINT';
import EXTBKS from './Pages/BookingsEXT';
import INTBKS from './Pages/BookingsINT';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user-select" element={<Userselect />} />
        <Route path="/dashboard-int" element={<ProtectedRoute allowedRoles={['Internal']}><INTdash /></ProtectedRoute>} />
        <Route path="/dashboard-ext" element={<ProtectedRoute allowedRoles={['External']}><EXTdash /></ProtectedRoute>} />
        <Route path="/facilities-ext" element={<ProtectedRoute allowedRoles={['External']}><EXTfaci /></ProtectedRoute>} />
        <Route path="/facilities-int" element={<ProtectedRoute allowedRoles={['Internal']}><INTfaci /></ProtectedRoute>} />
        <Route path="/bookings-ext" element={<ProtectedRoute allowedRoles={['External']}><EXTBKS /></ProtectedRoute>} />
        <Route path="/bookings-int" element={<ProtectedRoute allowedRoles={['Internal']}><INTBKS /></ProtectedRoute>} />


        {/*ADMIN*/}
        {/*
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
        <Route path="/facilities" element={<ProtectedRoute allowedRoles={['admin']}><Facilities /></ProtectedRoute>} />
        */}

        <Route path="/admindash" element={<AdminDashboard />} />
        <Route path="/adminfaci" element={<AdminFacilities />} />
        <Route path="/adminusers" element={<AdminUsers />} />
        <Route path="/adminbks" element={<AdminBookings />} />
        <Route path="/" element={<Landing />} />
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
