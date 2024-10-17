// Link to={href},
import { NavLink } from "react-router-dom";

import styles from "./NavigationItem.module.css";
import { getDialogsThunk } from "@src/store/user";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import type { RouteInfo } from "@src/interfaces";

function NavigationItem({ href, label, icon }: RouteInfo) {
    const dispatch = useAppDispatch();
    const id_user = useAppSelector((state) => state.user.idCurrentUser);
    return (
        <div
            onClick={() => {
                dispatch(getDialogsThunk({ id_user: id_user }));
                console.log(123);
            }}>
            <NavLink
                className={({ isActive }) =>
                    isActive ? styles.activClassName : styles.item
                }
                to={href}>
                <img src={icon} alt="" /> {label}
            </NavLink>
        </div>
    );
}

export default NavigationItem;
