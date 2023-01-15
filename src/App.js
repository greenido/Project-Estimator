import { useMemo, useState } from "react";
import "./styles.css";

const DEFAULT_developers = 2;
const DEFAULT_dev_per_hour = 200;
const DEFAULT_hours = 30;

//
//
//
export default function App() {
  const [devPerHour, setSevPerHour] = useState(DEFAULT_dev_per_hour);
  const [developers, setDevelopers] = useState(DEFAULT_developers);
  const [numHours, setNumHours] = useState(DEFAULT_hours);

  function onNumHoursChange(event) {
    const inNumHour = event.target.value;
    setNumHours(inNumHour);
  }

  function onDevPerHourChange(event) {
    const inPerHour = event.target.value;
    setSevPerHour(inPerHour);
  }

  function onDevelopersChange(event) {
    const inDevs = event.target.value;
    setDevelopers(inDevs);
  }

  const output = useMemo(() => {
    const total = developers * devPerHour * numHours;
    return total;
  }, [developers, devPerHour, numHours]);

  // Create our number formatter.
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <main>
      <h1>☕️ Project Estimator</h1>
      <div className="input-section">
        <p class="slider-output">⏳ Project hours: {numHours} </p>
        <input
          className="input-slider"
          onChange={onNumHoursChange}
          type="range"
          step="1"
          min="5"
          max="100"
          value={numHours}
        />
        <p class="slider-output">👩🏽‍💻 Developers: {developers} </p>
        <input
          className="input-slider"
          onChange={onDevelopersChange}
          type="range"
          step="1"
          min="1"
          max="10"
          value={developers}
        />
        <p class="slider-output">💰 Cost per hour: ${devPerHour}/hour</p>
        <input
          className="input-slider"
          onChange={onDevPerHourChange}
          type="range"
          min="100"
          max="350"
          step="50"
          value={devPerHour}
        />
      </div>
      <div className="output-section">
        <p>The Project will cost</p>
        <p className="output">{formatter.format(output)}</p>
      </div>

      <div id="quote">
        "The most difficult thing in any project is estimating it." - Joel
        Spolsky
      </div>
    </main>
  );
}
