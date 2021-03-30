// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
// import Home from "@components/Home/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import "./App.css";
import LoginUser from "./Components/LoginUser/LoginUser";
import Register from "./Components/Register/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/routes/ProtectedRoute";
import UserProfileUpdate from "./Components/UserProfileUpdate/UserProfileUpdate";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path="/login" component={LoginUser} />
        <Route path="/signup" component={Register} />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UserProfileUpdate} exact />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
