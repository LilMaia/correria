import InitialPageFooter from '../components/initial-page/InitialPageFooter';
import InitialPageHeader from '../components/initial-page/InitialPageHeader';
import TreinoIndividual from '../components/initial-page/TreinoIndividual';

function IndividualTreinoPage() {
  return (
    <div className="IndividualTreinoPage">
        <InitialPageHeader/>
        <TreinoIndividual/>
        <InitialPageFooter/>
    </div>
  );
}

export default IndividualTreinoPage;