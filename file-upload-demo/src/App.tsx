import './App.css';
import FileUpload from './components/FileUpload';
import FileUploadBase64 from './components/FileUploadBase64';

function App() {

  return (
    <div className='App'>
      <FileUpload />
      <hr />
      <FileUploadBase64 />
    </div>
  );
}

export default App;
