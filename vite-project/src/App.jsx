import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [clientId, setClientId] = useState('');
  const [clientsec, setClientsec] = useState('');
  const [clientScope, setClientScope] = useState('');
  const [state, setState] = useState('');

  const HandleClientId = (e) => {
    setClientId(e.target.value);
  };

  const HandleClientSec = (e) => {
    setClientsec(e.target.value);
  };

  const HandleScope = (e) => {
    setClientScope(e.target.value);
  };

  const HandleState = (e) => {
    setState(e.target.value);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth', {
        clientId,
        clientsec,
        clientScope,
        state,
      });

      // Redirect the user to Xero's authorization URL
      window.location.href = res.data.authorizeUrl;

      console.log('success');
    } catch (err) {
      console.log('error : ', err);
    }
  };

  return (
    <div>
      <form className="Authorization" onSubmit={HandleSubmit}>
        <input
          onChange={HandleClientId}
          type="text"
          placeholder="ClientId"
          name="client_id"
          value={clientId}
          required
        />
        <br />
        <input
          onChange={HandleClientSec}
          type="text"
          placeholder="Client Secret"
          name="client_secret"
          value={clientsec}
          required
        />
        <br />
        <input
          onChange={HandleScope}
          type="text"
          placeholder="Scope"
          name="scope"
          value={clientScope}
          required
        />
        <br />
        <input
          onChange={HandleState}
          type="text"
          placeholder="State"
          name="state"
          value={state}
          required
        />
        <br />
        <button type="submit" className="Submit-req">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
