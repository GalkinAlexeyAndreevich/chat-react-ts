import { useMobileDetect } from "@src/hooks/useMobileDetect";
import styles from "./MessageHeader.module.css"
import { IoMdArrowBack } from "react-icons/io";
import { useAppDispatch } from "@src/store/hook";
import { userActions } from "@src/store";
import { useNavigate } from "react-router-dom";
interface IProps{
    nameUser:string;
    photo?:string;
    whatDo?:string;
}
function MessageHeader({nameUser,photo,whatDo}:IProps){
    const isMobile = useMobileDetect()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onBackClick = ()=>{
        dispatch(userActions.setCurrentDialog(0))
        navigate("/chat")
    }
    return(
        <div className={styles.header}>
            {isMobile && <div style={{paddingTop:'7px'}} onClick={onBackClick}>
                <IoMdArrowBack size={29}/>
            </div>}
            <div className={styles.person}>
                <img src={photo} alt="" />
                <div className={styles.infoUser}>
                    <div className={styles.nameStatus}>
                        <p>{nameUser}</p>
                        <div className={styles.WhatDo}>
                            {/* <img src="" alt="" /> */}
                            <p>{whatDo}</p>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button><img src="../attach-2.svg" alt="" /></button>
                        <button><img src="../more-vertical.svg" alt="" /></button>
                    </div>
               
                </div>
            </div>

        </div> 
    )
}

export default MessageHeader