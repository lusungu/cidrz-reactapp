import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo, useState } from 'react';
import Table from './Table';
import './index.css';

function App() {

  // data state to store the dic test specifications. Its initial value is an empty array
  const [data, setData] = useState([]);

  // fire on load
  useEffect(function (){
    console.log("I have loaded!");

    fetch("http://localhost:8080/dic-tests", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
      setData(data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
  }, []);


  const columns = useMemo(
    () => 
      [{
        Header: 'Available Tests',
        columns: [
          {
            Header: "Test Code",
            accessor: "testCode"
          },
          {
            Header: "Test Name",
            accessor: "testName"
          },
          {
            Header: "Test Price (K)",
            accessor: "testPrice"
          }
        ]
      }], []
    
  );

  

  return (
    
      <div className="max-w-2xl mx-auto mt-5 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table  columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
