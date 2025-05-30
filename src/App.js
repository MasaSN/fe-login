import './App.css';
import Form from './components/Form';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex justify-center items-center h-screen">
        <Form />
      </div>
    </div>
  );
}

export default App;
