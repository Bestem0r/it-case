import styles from './navbar.module.css'
import Image from "next/image";

import logo from '../../../../public/beverage-svgrepo-com.svg'

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Image src={logo} alt="Logo" width={28} height={28} />
            </div>
            <h4 style={{marginLeft: "12px"}}>Cocktail Cove</h4>
        </div>
    )
}