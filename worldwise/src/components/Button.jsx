import styles from "./Button.module.css";

/*eslint-disable*/
function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      //   type={type}
      className={`${styles.btn} ${styles[type] ? styles[type] : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
