import "./App.scss";
import { NavBar } from "./navbar/NavBar.jsx";
import { MarketPlace } from "./marketplace/MarketPlace";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CartProvider } from "./cart-context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/">
              <MarketPlace />
            </Route>
          </Switch>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
