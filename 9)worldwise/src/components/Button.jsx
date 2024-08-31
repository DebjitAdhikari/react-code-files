import styles from './Button.module.css'
function Button({children, clickEvent, type}) {
    return (
        <div className={`${styles.btn} ${styles[type]}`} onClick={(e)=>{
            e.preventDefault()
            clickEvent()
            }}>
            {children}
        </div>
    )
}

export default Button
