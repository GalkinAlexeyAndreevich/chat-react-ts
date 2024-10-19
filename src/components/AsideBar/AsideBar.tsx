import React from "react";
import Navigation from "./Navigation";
import User from "./User";
import styles from './AsideBar.module.css'
import LogOutBtn from "./LogOutBtn";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getUserThunk } from "@src/store/user";
function AsideBar(){
    const currentUser = useAppSelector(state=>state.user.idCurrentUser)
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        console.log("Перед запросом", currentUser);
        
        dispatch(getUserThunk({id_user:currentUser}))
    },[currentUser,dispatch])
    return (
        <aside className={styles.asideBar}>
            <User />
            <Navigation />
            <LogOutBtn label={"LOG OUT"} icon={"../power.png"} />
        </aside>
    )
}
export default AsideBar;