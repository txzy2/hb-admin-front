import FadeIn from '@/shared/animations/FadeIn';
import {Main} from '@/components';
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_GOOGLE);

ReactGA.send({hitType: 'pageview', page: window.location.pathname});

function App() {
  return (
    <FadeIn>
      <Main />
    </FadeIn>
  );
}

export default App;
