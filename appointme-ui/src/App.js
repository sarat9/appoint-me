import logo from './logo.svg';
import './App.css';
import BookForm from './layouts/BookForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
           Book an <code> Appointment</code> with me!! 
        </p>
        <BookForm />
      </header>
    </div>
  );
}

export default App;
