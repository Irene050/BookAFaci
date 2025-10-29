import { Route, Routes } from 'react-router'
import SignUpFlow from "./components/SignUpFlow";
import Login from './Pages/Login'
import Userselect from './Pages/Userselect'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-select" element={<Userselect />} />
      </Routes>
    </div>
  )
}

export default App
