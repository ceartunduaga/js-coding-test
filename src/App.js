import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Customer from "./pages/Customer/Customer"; 
import Item from "./pages/Item/Item";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer/:customerName" element={<Customer />} />
      <Route path="/item/:itemName" element={<Item />} />
    </Routes>
  );
}

export default App;
