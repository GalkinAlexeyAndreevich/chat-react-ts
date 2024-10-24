import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/socketContext";
import {store} from "@store/index";
import { Provider } from "react-redux"; 
import { initAxiosInterceptors } from "./api";
import App from "./App";
import './index.css';

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
