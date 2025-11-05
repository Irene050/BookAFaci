import { Route, Routes } from 'react-router'
import SignUpFlow from "./components/SignUpFlow";
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login'
import Userselect from './Pages/Userselect'
import Dashboard from './Pages/Dashboard';
import Facilities from './Pages/facilities';
import ProtectedRoute from './Routeprotection';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-select" element={<Userselect />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
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
