"use client";

import {useRef, useState} from "react";
import { getAllIngredients } from "./api/IngredientController";
import AddIngredients from "./components/AddIngredients";
import IngredientList from "./components/IngredientList";

import styles from './page.module.css'
import Image from "next/image";

import downArrow from '../../public/down-arrow-svgrepo-com.svg'
import Navbar from "@/app/components/navbar/Navbar";

export default function Home() {
    const [refetch, setRefetch] = useState<boolean>(false);


    const ref = useRef<HTMLHeadingElement|null>(null);

    function scrollToIngredients() {

        console.log("Scrolling")
    }

    return (
        <main className={styles.main}>
            <div>
                <Navbar/>

                <div className={styles.welcomeContainer}>

                    <div className={styles.ideasContainer}>
                        <h1>Cocktail Cove</h1>
                        <h3>Find recipes for your favourite drinks</h3>
                        <button onClick={scrollToIngredients} style={{marginTop: "3em"}} className="buttonRounded">Check it out! </button>
                    </div>

                    <div onClick={() => console.log("fsdjksfdlkjlfsdkj")} className={styles.downButton}>
                        <h3>Try now</h3>
                        <Image src={downArrow} alt="Down" height={32} width={32}/>
                    </div>

                </div>


                <div className={styles.ingredientsContainer}>
                    <h1 ref={ref}>Add your ingredients</h1>
                    <div style={{marginTop: "2em"}}>
                        <div className={styles.ingredientsInnerContainer}>
                            <AddIngredients setRefetch={setRefetch} />
                            <IngredientList refetch={refetch} setRefetch={setRefetch} />
                        </div>
                        <button style={{width: "100%", marginTop: "1em"}} className="buttonRounded">Find drinks</button>
                    </div>
                </div>

                <div className={styles.recipesContainer}>
                    <h1>Here's some drinks you can make</h1>
                </div>
            </div>
        </main>
    )
}
