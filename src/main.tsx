import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import {store} from "@store/index";
import { Provider } from "react-redux"; 
import { SocketProvider } from "./context/socketContext";
import { initAxiosInterceptors } from "./api";

createRoot(document.getElementById("root")!).render(
    <SocketProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </SocketProvider>
);

initAxiosInterceptors(store);
