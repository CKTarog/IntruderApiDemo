import { useEffect, useState } from 'react'
import './App.css'
import {WebApi, RestApi} from './Components';

function App() {
  const [logs, setLog] = useState([]);

  const showLogs = () => {
    //fetch('http://localhost/ArduinoStuff/IntruderScanner/REST_api.php') //connect to REST api
    fetch('http://localhost/ArduinoStuff/IntruderScanner/intruder_api.php')
      .then(res => res.json())
      .then(data => {console.log("Logs:", data); setLog(data);})
      .catch(err => console.error("Fetch error:", err));
  };

  const addLog = (distance) => {
    const floatDistance = parseFloat(distance); //convert to float
    fetch('http://localhost/ArduinoStuff/IntruderScanner/REST_api.php', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ distance: floatDistance })
    })
      .then(() => showLogs());
  };

  const deleteLog = async (id) => {
    await fetch(`${'http://localhost/ArduinoStuff/IntruderScanner/REST_api.php'}?id=${id}`, {method: "DELETE"});
    showLogs();
  };

  useEffect(() => {
    showLogs();
  }, []);

  return (
    <>
      <WebApi logs={logs}/>
      {/* <RestApi logs={logs} addLog={addLog} deleteLog={deleteLog}/> */}
    </>
  )
}

export default App
