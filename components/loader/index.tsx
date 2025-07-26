'use client'; 

import styles from './index.module.css';

export default function Loader() {
  return (<div className={styles.dot_spinner}>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
    <div className={styles.dot_spinner__dot}></div>
  </div>);
  
}
