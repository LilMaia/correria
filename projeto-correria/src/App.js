import './styles/app/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialPage from './pages/InitialPage';
import IndividualTreinoPage from './pages/TreinoIndividualPage';
import CarregarExcelPage from './pages/CarregarExcelPage';
import Login from './pages/Login';
import ForgotPassWord from './pages/ForgotPassWord';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';
import ConfigAccount from './pages/ConfigAccount';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/treino-individual" element={<IndividualTreinoPage />} />
          <Route path="/carregar-excel" element={<CarregarExcelPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassWord" element={<ForgotPassWord />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/register" element={<Register />} />
      
          <Route path="/configaccount" element={<ConfigAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;