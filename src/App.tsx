// import AsideBar from "../components/AsideBar";
// import ChatWindow from "../components/ChatWindow";
// import Message from "../components/Message";
// import Example from "../components/Routers/Routers";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import AsideBar from "@src/components/AsideBar";
import MainWindow from "./components/MainWindow";

function App() {
  return (
    <div className={styles.App}>
      <AsideBar />
      {/* <ChatWindow /> */}
      <Routes>
        <Route path="/chat/*" element={<MainWindow />} />
      </Routes>

      {/* <Message />
      <Example /> */}
    </div>
  );
}

export default App;
