import styles from './Navbar.module.css'
import Image from "next/image";

import logo from '../../../../public/beverage-svgrepo-com.svg'


export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <h4 className={styles.logo}>Cocktail Cove</h4>
        </div>
    )
}