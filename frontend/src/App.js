// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import store from "./store";
import ProtectedRoute from "./Components/routes/ProtectedRoute";

// Layout Components

import Footer from "./Components/LayoutComponent/Footer/Footer";
import Header from "./Components/LayoutComponent/Header/Header";
import Home from "./Components/LayoutComponent/Home/Home";
import Register from "./Components/LayoutComponent/Register/Register";
import LoginUser from "./Components/LayoutComponent/LoginUser/LoginUser";

// Product Components
import ProductDetails from "./Components/ProductComponents/ProductDetails/ProductDetails";

// User Components
import ForgotPassword from "./Components/UserComponents/ForgotPassword/ForgotPassword";
import NewPassword from "./Components/UserComponents/NewPassword/NewPassword";
import Profile from "./Components/UserComponents/Profile/Profile";
import UpdatePassword from "./Components/UserComponents/UpdatePassword/UpdatePassword";
import UserProfileUpdate from "./Components/UserComponents/UserProfileUpdate/UserProfileUpdate";

// Cart Components
import Cart from "./Components/CartComponents/Cart/Cart";

// Order Components
import ConfirmOrder from "./Components/OrderComponents/ConfirmOrder/ConfirmOrder";
import ListOrders from "./Components/OrderComponents/ListOrders/ListOrders";
import OrderDetail from "./Components/OrderComponents/OrderDetail/OrderDetail";
import OrderSuccess from "./Components/OrderComponents/OrderSuccess/OrderSuccess";
import PaymentRoute from "./Components/routes/PaymentRoute";
import Shipping from "./Components/OrderComponents/Shipping/Shipping";

// Admin Components
import AdminProductList from "./Components/AdminProductList/AdminProductList";
import CreateProduct from "./Components/CreateProduct/CreateProduct";
import Dashboard from "./Components/AdminComponents/Dashboard/Dashboard";
import OrderLIstAdmin from "./Components/AdminComponents/OrderLIstAdmin/OrderLIstAdmin";
import OrderProcess from "./Components/AdminComponents/OrderProcess/OrderProcess";
import ProductReviewsAdmin from "./Components/AdminComponents/ProductReviewsAdmin/ProductReviewsAdmin";
// import ProductUpdate from "./Components/ProductUpdate/ProductUpdate";
import UpdateUser from "./Components/AdminComponents/UpdateUser/UpdateUser";
import UsersListAdmin from "./Components/AdminComponents/UsersListAdmin/UsersListAdmin";
import "./App.css";
import ProductUpdate from "./Components/AdminComponents/ProductUpdate/ProductUpdate";

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
        <ProtectedRoute
          path="/order/detail/:id"
          component={OrderDetail}
          exact
        />
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />

        {/* Admin Routes */}
        <ProtectedRoute path="/dashboard" isAdmin component={Dashboard} exact />
        <ProtectedRoute
          path="/admin/products"
          isAdmin
          component={AdminProductList}
          exact
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin
          component={CreateProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin
          component={ProductUpdate}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin
          component={ProductReviewsAdmin}
          exact
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin
          component={OrderLIstAdmin}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin
          component={OrderProcess}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin
          component={UsersListAdmin}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin
          component={UpdateUser}
          exact
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
