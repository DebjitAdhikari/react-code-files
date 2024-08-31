import { Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import Logo from "./Logo"
import styles from "./SideBar.module.css"
function SideBar() {
    return (
        <div className={styles.sidebar}>
            <Logo></Logo>
            <AppNav></AppNav>
            <Outlet></Outlet>
            <footer className={styles.footer}>
                <p className={styles.copyright}>Copyright....</p>
            </footer>
        </div>
    )
}

export default SideBar
