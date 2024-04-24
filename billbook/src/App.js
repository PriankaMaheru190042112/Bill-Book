import 'bootstrap/dist/css/bootstrap.min.css';
import InvoiceForm from './components/InvoiceForm';
import React from 'react';
import Header from './components/Header';


function App() {
  return (
    <div className="App bg-amber-50" >
      <Header/>
      <div className="container">
     <InvoiceForm/>
        </div>
    </div>
  );
}

export default App;
