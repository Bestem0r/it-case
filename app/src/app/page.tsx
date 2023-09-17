import styles from './page.module.css'
import Image from "next/image";

import downArrow from '../../public/down-arrow-svgrepo-com.svg'

export default function Home() {
  return (
      <main>

          <div className={styles.welcomeContainer}>

              <div className={styles.ideasContainer}>
                  <h1>Cocktail Cove</h1>
                  <h3>Find recipes for your favourite drinks</h3>
                  <button style={{marginTop: "12px"}} className="buttonRounded">Check it out! </button>
              </div>

              <div className={styles.downButton}>
                  <h3>Try now</h3>
                  <Image src={downArrow} alt="Down" height={32} width={32}/>
              </div>

          </div>


          <div className={styles.ingredientsContainer}>


          </div>
      </main>
  )
}
