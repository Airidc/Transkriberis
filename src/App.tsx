import './assets/styles/site-styles.scss';
import AudioPlayer from './components/audio-player/AudioPlayer';
import Layout from './components/Layout';
import TextEditor from './components/TextEditor';

function App() {
  return (
    <Layout>
      <h1><span className="label">BETA</span> Transkriberis</h1>
      <div className="container">
        <AudioPlayer></AudioPlayer>
        <TextEditor></TextEditor>
        {/* <AudioPlayer></AudioPlayer>
        <Settings></Settings> */}
      </div>
    </Layout>
  );
}

export default App;
