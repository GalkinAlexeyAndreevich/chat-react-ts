import { useNavigate } from "react-router-dom";
import styles from "./LogOutBtn.module.css";
import { useAppDispatch } from "@src/store/hook";
import { userActions } from "@src/store";
interface IProps{
    label:string;
    icon:string
}

function LogOutBtn({label, icon}:IProps){
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem("currentUser")

        dispatch(userActions.setCurrentDialog(0));
        // Redirect to the registration page
        navigate('/auth');
    };
    return(
        <button onClick={handleLogout} className={styles.button}>
            <img src={icon} alt="" />
            <span>{label}</span>
        </button>
    );
}

export default LogOutBtn;