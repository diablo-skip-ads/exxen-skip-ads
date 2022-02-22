/*global chrome*/
import React from "react";
import logo from "./diablo.jpeg";
import "./App.css";
import Switch from "react-switch";

const App = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (_checked) => {
    setChecked(_checked);
    chrome.storage.local.set({ diabloStatus: _checked }, () => {});
  };

  const setStatusFromStorage = () => {
    chrome.storage.local.get(["diabloStatus"], (items) => {
      if (items["diabloStatus"]) {
        setChecked(items["diabloStatus"]);
      }
    });
  };

  React.useEffect(() => {
    setStatusFromStorage();
    chrome.storage.onChanged.addListener(() => {
      setStatusFromStorage();
    });
  }, []);

  return (
    <div className="App">
      <img src={logo} alt="logo" width="100%" />
      <div className="App-activation">
        <p style={{ flex: 1 }}>{checked ? "diablo aktif" : "..."}</p>
        <div style={{ paddingRight: 10 }}>
          <Switch onChange={handleChange} checked={checked} />
        </div>
      </div>
    </div>
  );
};

export default App;
