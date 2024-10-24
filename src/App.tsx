import styles from "./App.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { userActions } from './store/user';
import { useSocket } from "./hooks/useSocket";
import Routers from "./Routers";

function App() {
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const localUser = localStorage.getItem("currentUser")
    if(Number(localUser)){
      dispatch(userActions.setCurrentUser(Number(localUser)))
    }
  },[dispatch])
  const { connectSocket } = useSocket();


  useEffect(() => {
    let cleanup: (() => void) | void;

    if (currentUser) {
      cleanup = connectSocket(currentUser);
    }

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [currentUser, connectSocket]);
  return (
    <div className={styles.App}>
      <Routers />
    </div>
  );
}

export default App;
