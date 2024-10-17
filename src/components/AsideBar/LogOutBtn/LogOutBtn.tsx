import styles from "./LogOutBtn.module.css";
interface IProps{
    label:string;
    icon:string
}

function LogOutBtn({label, icon}:IProps){
    return(
        <button className={styles.button}>
            <img src={icon} alt="" />
            <span>{label}</span>
        </button>
    );
}

export default LogOutBtn;