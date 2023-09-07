import { useState, useEffect } from 'react';
import './App.css';
import { carDetails } from '../src/apiCalls/apiCalls';
import Variants from '../src/components/Variants/Variants';
import Menu from './assets/menu.svg';
import Close from './assets/close.svg';

interface FormData {
  name: string;
  model: string;
  year: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    model: '',
    year: '',
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState<boolean>();
  const [initialload, setInitialload] = useState<boolean>(false);
  const [sidebarclosed, setsidebarClosed] = useState<boolean>(true);

  useEffect(() => {
    setInitialload(true);
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //extracting the name and value from the event target
    const { name, value } = event.target;
    //Update the formdata state using prev state and the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // form submission logic
    setInitialload(false);
    setLoading(true);
    carDetails(formData.name, formData.model, formData.year).then((data) => {
      setResults(data);
      setLoading(false);
      setsidebarClosed(true)
    });
  };

  const menuToggle = () => {
    setsidebarClosed(!sidebarclosed)
  }


  return (

    <>
      <div className="App">
        <nav onClick = {menuToggle}> { sidebarclosed? (<img className = 'menuicons' src = {Menu}/>) : (<img className = 'menuicons' src = {Close}/>)}</nav>
        <div className={ sidebarclosed? "searchsection" : "searchsectionside"}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="question"
              id="nme"
              required
              autoComplete="off"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="nme">
              <span>Enter Car Brand</span>
            </label>
            <input
              type="text"
              name="model"
              className="question"
              id="nme"
              required
              autoComplete="off"
              value={formData.model}
              onChange={handleInputChange}
            />
            <label htmlFor="nme">
              <span>Enter Car Model</span>
            </label>
            <input
              type="text"
              name="year"
              className="question"
              id="nme"
              required
              autoComplete="off"
              value={formData.year}
              onChange={handleInputChange}
            />
            <label htmlFor="nme">
              <span>Enter Model Year</span>
            </label>
            <input type="submit" value="Search" />
          </form>
          <div className="disclaimercontainer">
            <p className="disclaimer">
              The data presented is sourced from the National Highway Traffic
              Safety Administration (NHTSA), an agency of the U.S. federal
              government. As a result this information is derived from vehicles
              in the American market and it is not known whether it is appliable
              to vehicles in other markets.
            </p>
          </div>
        </div>
        <div className="carddescriptionsection">
          {initialload ? (
            <div className="cardcontainer">
              <div className="initial">
                <img
                  className="landingimage"
                  src={
                    'https://static.nhtsa.gov/images/vehicles/50356_st0640_046.png'
                  }
                />
                <p>
                  Enter car details then hit search to get car information.{' '}
                </p>
              </div>
            </div>
          ) : (
            <div className="cardcontainer">
              {' '}
              {loading ? (
                <div className="initial">
                  <div>
                    <span className="spinner"></span>
                    <p>Fetching results</p>
                  </div>
                </div>
              ) : (
                <div>
                  {results.length > 0 ? (
                    <Variants results={results} />
                  ) : (
                    <div className = 'errormessage'><p>Car details not available, search for another model, or make sure details are entered correctly.</p></div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
