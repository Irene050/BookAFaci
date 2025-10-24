import { Route, Routes } from 'react-router'
import Login from './Pages/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
