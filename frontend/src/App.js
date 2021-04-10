// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
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
import NewPassword from "./Components/NewPassword/NewPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Shipping/Shipping";
import ConfirmOrder from "./Components/ConfirmOrder/ConfirmOrder";
import PaymentRoute from "./Components/routes/PaymentRoute";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import ListOrders from "./Components/ListOrders/ListOrders";
import OrderDetail from "./Components/OrderDetail/OrderDetail";

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
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UserProfileUpdate} exact />
        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} exact />
        <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />
        <ProtectedRoute path="/payment" component={PaymentRoute} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} exact />
        <ProtectedRoute path="/orders/me" component={ListOrders} exact />
        <ProtectedRoute path="/order/:id" component={OrderDetail} exact />
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
