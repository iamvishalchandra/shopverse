// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/" component={Home} exact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
