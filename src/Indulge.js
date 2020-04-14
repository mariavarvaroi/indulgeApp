import React from 'react'
import { ReactComponent as Food } from './watermelon.svg'
import styles from './Styles.module.css'

const Indulge = () => {
    return (
        <div>
            <span>Indulge App</span>
            <div className={styles.container}>

                <div className={styles.top}>

                    <h2 className={styles.header}>Snack! </h2>
                </div>

                <div className={styles.center}>
                    <div className={styles.photo}>
                        <Food height="38px" width="38px" />
                    </div>
                    <div className={styles.calories}>
                        <h3>Calories: 200</h3>

                    </div>
                </div>


                <div className={styles.bottom}>
                    <div className={styles.name}>
                        <span>Pepenica</span>
                        <span>3 felii</span>
                    </div>

                    <div className={styles.list}>
                        <ul className={styles.list}>
                            <li><span> easy to digest </span></li>
                            <li><span> veggie </span></li>
                            <li><span> high on protein </span></li>
                            <li><span> high on carbs </span></li>
                            <li><span> high on fiber</span></li>
                            <li><strong>Indulge!</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Indulge;
