import { h } from 'preact';
import Image from './components/Image';

function App() {
  return (
    <div>
      <h1>My Component</h1>
      <Image src="/example.png" alt="Example" />
    </div>
  );
}

export default App;
