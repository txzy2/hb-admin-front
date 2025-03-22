import FadeIn from '@/shared/animations/FadeIn';
import {FallingStars} from './shared/animations';
import {Main} from '@/components';

function App() {
  return (
    <FadeIn>
      <Main />
    </FadeIn>
  );
}

export default App;
