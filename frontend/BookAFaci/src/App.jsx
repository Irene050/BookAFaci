import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login'
import Userselect from './Pages/Userselect'
import Dashboard from './Pages/Dashboard';
import Facilities from './Pages/facilities';
import ProtectedRoute from './Routeprotection';
import EXTdash from './Pages/DashboardEXT';
import INTdash from './Pages/DashboardINT';
import EXTfaci from './Pages/FacilitiesEXT';
import INTfaci from './Pages/FacilitiesINT';
import EXTBKS from './Pages/BookingsEXT';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-select" element={<Userselect />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
        <Route path="/facilities" element={<ProtectedRoute allowedRoles={['admin']}><Facilities /></ProtectedRoute>} />
        <Route path="/dashboard-ext" element={<ProtectedRoute allowedRoles={['External']}><EXTdash /></ProtectedRoute>} />
        <Route path="/dashboard-int" element={<ProtectedRoute allowedRoles={['Internal']}><INTdash /></ProtectedRoute>} />
        <Route path="/facilities-ext" element={<ProtectedRoute allowedRoles={['External']}><EXTfaci /></ProtectedRoute>} />
        <Route path="/facilities-int" element={<ProtectedRoute allowedRoles={['Internal']}><INTfaci /></ProtectedRoute>} />
        <Route path="/bookings-ext" element={<ProtectedRoute allowedRoles={['External']}><EXTBKS /></ProtectedRoute>} />
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
