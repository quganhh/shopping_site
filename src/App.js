import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductFeature from "./features/Product/ProductFeature";
import CartPage from "./features/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/products/*" element={<ProductFeature />} />
        <Route path="/cart/*" element={<CartPage />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
