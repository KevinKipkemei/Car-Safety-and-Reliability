import './Recalls.css';
import { useState } from 'react';
import chevrondown from '../../assets/chevrondown.svg';

const Recalls = ({
  complaints,
  loading,
  recalls,
}: {
  complaints: any[];
  loading: boolean;
  recalls: any[];
}) => {
  const [complaintsopen, setcomplaintsOpen] = useState<boolean>(false);
  const [recallsopen, setrecallsOpen] = useState<boolean>(false);

  const complaintsToggle = () => {
    setcomplaintsOpen(!complaintsopen);
  };

  const recallsToggle =() => {
    setrecallsOpen(!recallsopen)
  }

  return (
    <div className="maincontainer">
      {complaints?.length > 0 ? (
        <div>
          <div className="accordiontoggle" onClick={complaintsToggle}>
            <p className="heading">CUSTOMER COMPLAINTS</p>
            <img
              className={complaintsopen ? 'chevronup' : 'chevrondown'}
              src={chevrondown}
            />
          </div>
          <div className={complaintsopen ? 'accordionopen' : 'accordionclosed'}>
            {complaints?.map((complaint, index) => (
              <div key={index} className="complaintslist">
                <p className="defaulttext">{index + 1}</p>
                <p className="defaulttext">Component: {complaint.components}</p>
                <p className="heading1">Summary</p>
                <p className="defaulttext">{complaint.summary}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="defaultdiv">
          <p className="defaulttext">
            Select a variant to see the customer complaints and recall
            information
          </p>
          {loading ? (
            <div>
              <span className="spinner"></span>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      )}
      {recalls?.length > 0 ? (
        <div>
          <div className="accordiontoggle" onClick={recallsToggle}>
            <p className="heading">MANUFACTURER RECALLS</p>
            <img
              className={recallsopen ? 'chevronup' : 'chevrondown'}
              src={chevrondown}
            />
          </div>
          <div className={recallsopen ? 'accordionopen' : 'accordionclosed'}>
          {recalls.map((recall, index) => (
            <div key={index} className="complaintslist">
              <p className="defaulttext">{index + 1}</p>
              <p className="heading1">Summary</p>
              <p className="defaulttext">{recall.summary}</p>
              <p className="heading1">Consequence</p>
              <p className="defaulttext">{recall.consequence}</p>
              <p className="heading1">Remedy</p>
              <p className="defaulttext">{recall.correctiveAction}</p>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Recalls;
