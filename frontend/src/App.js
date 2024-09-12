import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Routing";
import { UserProvider } from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer />
        <Routing />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
