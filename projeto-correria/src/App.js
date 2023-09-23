import './styles/app/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InitialPage from './pages/InitialPage';
import IndividualTreinoPage from './pages/TreinoIndividualPage';
import CarregarExcelPage from './pages/CarregarExcelPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/treino-individual" element={<IndividualTreinoPage />} />
          <Route path="/carregar-excel" element={<CarregarExcelPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;