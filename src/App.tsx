import './assets/styles/site-styles.scss';
import Layout from './components/Layout';
import TextEditor from './components/TextEditor';

function App() {
  return (
    <Layout>
      <h1><span className="label">BETA</span> Transkriberis</h1>
      <div className="container">
        AUDIO PLAYER
        <TextEditor></TextEditor>
        {/* <AudioPlayer></AudioPlayer>
        <Settings></Settings> */}
      </div>
    </Layout>
  );
}

export default App;
