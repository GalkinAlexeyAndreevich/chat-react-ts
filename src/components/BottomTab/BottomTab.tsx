
import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './BottomTab.module.css';
import { getDialogsThunk, userActions } from '@src/store/user';
import { useAppDispatch, useAppSelector } from '@src/store/hook';

const BottomTab = () => {
	const {idCurrentUser:userId, currentDialog} = useAppSelector(state=>state.user)

	const dispatch = useAppDispatch()
	const openChats = ()=>{
		dispatch(getDialogsThunk({ id_user:userId }));
		dispatch(userActions.setCurrentDialog(0))
	}
	if(currentDialog){
		return <div></div>
	}
	return (
		<nav className={styles.bottomTab}>
				<NavLink to="/home" className={styles.tab}>
						<img src="../contact.svg" alt="Home" />
						<span>Профиль</span>
				</NavLink>
				<NavLink to="/contact" className={styles.tab}>
						<img src="../home.svg" alt="Contact" />
						<span>Сервисы</span>
				</NavLink>
				<NavLink onClick={openChats} to="/chat" className={styles.tab}>
						<img src="../chat.svg" alt="Chat" />
						<span>Чат</span>
				</NavLink>

				<NavLink to="/settings" className={styles.tab}>
						<img src="../notifications.svg" alt="Settings" />
						<span>Уведомления</span>
				</NavLink>
		</nav>
	);
}

export default BottomTab
