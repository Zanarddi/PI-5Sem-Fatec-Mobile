import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";


const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
      </Routes>
    </BrowserRouter>
  );
};
export default App;

