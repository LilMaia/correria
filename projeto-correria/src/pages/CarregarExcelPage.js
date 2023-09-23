import InitialPageFooter from '../components/initial-page/InitialPageFooter';
import InitialPageHeader from '../components/initial-page/InitialPageHeader';
import CarregarExcel from '../components/initial-page/CarregarExcel';

function IndividualTreinoPage() {
  return (
    <div className="IndividualTreinoPage">
        <InitialPageHeader/>
        <CarregarExcel/>
        <InitialPageFooter/>
    </div>
  );
}

export default IndividualTreinoPage;