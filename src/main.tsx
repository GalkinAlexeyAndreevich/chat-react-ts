import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import {store} from "@store/index";
import { Provider } from "react-redux"; 

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
