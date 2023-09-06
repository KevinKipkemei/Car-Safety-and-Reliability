import './Variants.css';
import Recalls from '../Recalls/Recalls';
import { useState, useEffect, useCallback } from 'react';
import { complaintsCall } from '../../apiCalls/apiCalls';
import {recallsCall} from '../../apiCalls/apiCalls'

interface QueryParams {
  name: string;
  model: string;
  year: string;
  vehicleID: number;
}

interface Variant {
  make: string;
  vehicleModel: string;
  modelYear: string;
  series: string;
  recallsCount: number;
  complaintsCount: number;
  vehicleId: number
  vehiclePicture: string
}

const Variants = (results: { results: Variant[] }) => {
  const [complaints, setComplaints] = useState([]);
  const [recalls, setRecalls] =  useState([])
  const [loading, setLoading] = useState(false)
  const [sliderclosed, setsliderClosed] = useState<boolean>(true)

  const [queryParams, setqueryParams] = useState<QueryParams>({
    name: '',
    model: '',
    year: '',
    vehicleID: 0,
  });

  const variantSelect = async (element: {make: string; vehicleModel: string; modelYear: string; vehicleId: number;}) => {
    setqueryParams({
      ...queryParams,
      name: element.make,
      model: element.vehicleModel,
      year: element.modelYear,
      vehicleID: element.vehicleId,
    });
  };

  // Memoize the fetchData function using useCallback
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const complaintsData = await complaintsCall(queryParams.name, queryParams.model, queryParams.year);
      const recallsData = await recallsCall(queryParams.vehicleID)
      setComplaints(complaintsData);
      setRecalls(recallsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  }, [queryParams]);

  useEffect(() => {
    // Call the API when all queryParams are ready
    if (queryParams.name && queryParams.model && queryParams.year && queryParams.vehicleID) {
      fetchData();
      setsliderClosed(!sliderclosed)
    }
  }, [queryParams, fetchData]);


  return (
    <div className="resultscontainer">
      <div className="results">
        <div className="topsection">
          <div className="carimage">
            {
              results.results[0]?.vehiclePicture?
               (<img className="image" src={results.results[1].vehiclePicture} />)
                :
               (<div className = 'errordiv'>
                 <p className =  'errortext'>Car image not available</p>
                 </div>)
            }
          </div>
        </div>
        <div className="bottomsection">
          <div>
          <p className="heading">Select variant</p>
          <div className="cardsdiv">
            {results?.results.map((element, index) => (
              <button
                className="variantbutton"
                key={index}
                onClick={() => variantSelect(element)}
              >
                <p className="title">
                  {element.vehicleModel} {element.series}
                </p>
                <p className="info">{element.recallsCount} Recall(s)</p>
                <p className="info">
                  {element.complaintsCount} Customer Complaint(s)
                </p>
              </button>
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className = {sliderclosed? "mobilesliderclosed": "mobileslideropen"}>
        <p onClick = {() => setsliderClosed(true)}>Close</p>
        <Recalls complaints = {complaints} loading = {loading} recalls = {recalls}/>
      </div>
    </div>
  );
};

export default Variants;
