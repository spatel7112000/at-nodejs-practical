import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login/index";
import Registration from "./Pages/Registration/index";
import Profile from "./Pages/ProfilePage/index";
import { Provider } from "react-redux";
import { store } from "./redux/Store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <PrimeReactProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Router>
            <Routes>
              {/* Define your routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </PrimeReactProvider>
      </Provider>
    </>
  );
}

export default App;
