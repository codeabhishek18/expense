import Body from "./Components/Body";
import Home from "./Components/Home";
import { GlobalProvider } from "./Context/GlobalContext";
import './App.css'

function App() {
  return(
    <div className="flex justify-center h-screen align-center">
      <GlobalProvider>
        <Body/>
      </GlobalProvider>
    </div>
  );
}

export default App;
