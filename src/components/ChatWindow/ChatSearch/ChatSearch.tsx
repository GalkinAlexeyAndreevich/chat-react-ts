import styles from "./ChatSearch.module.css"

function ChatSearch(){
    return(
        <div className={styles.container}>
            <button className={styles.button}> <img src={"../search.svg"} alt=""></img></button>
            <input className={styles.input} type="text" placeholder="Search" />
        </div>
    )
}

export default ChatSearch 