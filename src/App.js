import { useState } from "react";
import "./App.css";
import Barchart from "./Barchart";
import sunshine from "./sunshine.json";
import Select from "react-select";
const options = [
  { value: "JUL", label: "July" },
  { value: "AUG", label: "August" },
  { value: "SEP", label: "September" },
];
function App() {
  const [month, setMonth] = useState(options[0]);

  const data = sunshine
    .map((item) => {
      return {
        city: item.CITY,
        sunshine: item[month.value],
      };
    })
    .sort((a, b) => b.sunshine - a.sunshine)
    .slice(0, 20);

  return (
    <div className="App">
      <div className="header">
        <h1>Sunshine by City</h1>
        <Select options={options} defaultValue={options[0]} onChange={setMonth}></Select>
      </div>
      <div className="container">
        <Barchart width={1000} height={500} data={data} />
      </div>
    </div>
  );
}

export default App;
