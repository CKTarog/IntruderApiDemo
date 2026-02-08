import { useEffect, useState } from 'react'
import './App.css'
import {WebApi, RestApi, SoapApi} from './Components';

function App() {
  //WEB api -----------------------
  const [data, setData] = useState([]);
  const handleLogs = async () => {
    const response = await fetch('http://localhost/ArduinoStuff/IntruderScanner/intruder_api.php?action=getLogs');
    const result = await response.json();
    console.log("WEB API Logs:", result);
    setData(result);
  }
  //autoload WEB
  useEffect(() => { handleLogs();}, []);

  //---------------------------------
  // REST api -----------------------
  const [logs, setLogs] = useState([]);

  const showLogs = () => {
    fetch('http://localhost/ArduinoStuff/IntruderScanner/REST_api.php') //connect to REST api
      .then(res => res.json())
      .then(data => {console.log("REST API Logs:", data); setLogs(data);})
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
  //autoload REST
  useEffect(() => {showLogs();}, []);

  // SOAP api ---------------------------
  const [soapLogs, setSoapLogs] = useState([]);
  const sendSoap = async(xml) => {
    try{
      const response = await fetch('http://localhost/ArduinoStuff/IntruderScanner/SOAP_api.php', {
        method: 'POST',
        headers: {
          "Content-Type": 'text/xml'
        },
        body: xml
      });

      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const returns = xmlDoc.getElementsByTagName("return");
      let items = [];

      if (returns.length > 0) {
        const children = returns[0].children;
        if (children.length > 0 && children[0].tagName !== "item") {
          items = [returns[0]];
        } else {
          items = [...returns[0].getElementsByTagName("item")];
        }
      }

      const parsedLogs = items.map(item => ({
        id: item.querySelector("id")?.textContent,
        sensor_type: item.querySelector("sensor_type")?.textContent,
        distance: item.querySelector("distance")?.textContent,
        time_detected: item.querySelector("time_detected")?.textContent
      }));
      setSoapLogs(parsedLogs);
    } catch (error) {
      console.error("SOAP error:", error);
      setSoapLogs([]);
    }
  };

  const handleSoapLogs =()=>{
    const xml = '<?xml version="1.0"?>' + 
    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:m="http://localhost/ArduinoStuff/IntruderScanner/SOAP_api.php">' + 
    '<soap:Body><m:GetLogs/></soap:Body></soap:Envelope>';
    sendSoap(xml);
  };

  const createSoapLogs  = async (distance) => {
  const xml = '<?xml version="1.0"?>' +
    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:m="http://localhost/ArduinoStuff/IntruderScanner/SOAP_api.php">' +
    '<soap:Body><m:CreateLog>' +
    `<distance>${distance}</distance>` +
    '</m:CreateLog></soap:Body></soap:Envelope>';

    try {
      await sendSoap(xml); handleSoapLogs();
    } catch (err) {
      console.error("Create SOAP log error:", err);
    }
  };
  //autoload SOAP
  useEffect(() => {handleSoapLogs();}, []);

  return (
    <>
      <WebApi data={data}/>
      <RestApi logs={logs} addLog={addLog} deleteLog={deleteLog}/>
      <SoapApi soapLogs={soapLogs} createSoapLogs={createSoapLogs}/>
    </>
  )
}

export default App
