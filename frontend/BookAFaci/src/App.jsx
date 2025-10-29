import { Route, Routes } from 'react-router'
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

/*
import { useState } from "react";
import UserTypeSelection from "./components/UserTypeSelection";
import InternalSignUp from "./components/InternalSignUp";
import ExternalSignUp from "./components/ExternalSignUp";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");

  const handleContinue = (type) => {
    setUserType(type);
    setStep(2);
  };

  return (
    <div className="app">
      {step === 1 && <UserTypeSelection onContinue={handleContinue} />}
      {step === 2 && userType === "internal" && <InternalSignUp />}
      {step === 2 && userType === "external" && <ExternalSignUp />}
    </div>
  );
}

export default App;
*/