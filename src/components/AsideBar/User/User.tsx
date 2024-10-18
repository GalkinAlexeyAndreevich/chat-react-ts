import React from "react";
import styles from './User.module.css'
import { useAppSelector } from "@src/store/hook";
function User(){
    const userInfo = useAppSelector(state=>state.user.userInfo)
    const [isLoad,setIsLoad] = React.useState(false)
    
    React.useEffect(()=>{
        if(!userInfo)return
        setIsLoad(true)
    },[userInfo])
 return(
    isLoad?
    <div className={styles.user}>
        <div className={styles.userPhoto}>
            <img src={"../galkinAlexeyLogo.png"} alt="" />
        </div>
        
        <p className={styles.nameUser}>{userInfo?userInfo.login_user:"Нет информации о пользователе"}</p>
    </div>:null
    
 )
}
export default User
