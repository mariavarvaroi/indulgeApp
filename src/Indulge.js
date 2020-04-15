import React from 'react';
import styles from './Styles.module.css';
import Food from './svg/watermelon.svg'
import Cake from './svg/cake.svg'
import Protein from './svg/fries.svg'
import Carbs from './svg/meat.svg'
import Digest from './svg/ok.svg'
import { food } from './food'

const list = food;
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const Indulge = () => {

    const [randomId, setRandomId] = React.useState(0)
    const [randomFood] = list.filter(food => food.id === randomId)

    const handleRefresh = () => {
        const newId = getRandomInt(list.length);
        (newId !== randomId) ? setRandomId(newId) : handleRefresh()

    }
    console.log('haleu fresh', randomFood)

    return (
        <div>
            <span>Indulge App</span>

            <Card item={randomFood} handleRefresh={handleRefresh} />


        </div>
    )
}

const Card = ({ item, handleRefresh }) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.header}>It's a {item.type[0]} </div>
                <button type="button" onClick={handleRefresh}>Refresh</button>
            </div>

            <div className={styles.body}>
                <div className={styles.cals}>Calories: {item.calories}</div>
                <div className={styles.photo}>
                    <img src={Food} alt='food' />
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.name}>
                    <h3>Name: {item.name}</h3>
                    <h3>Quantity: {item.quantity}</h3>
                </div>
                <div>
                    <ul className={styles.list}>
                        {item.properties.digest && <li><img src={Digest} alt="easy digestion" /> </li>}
                        {item.properties.veggie && <li><img src={Food} alt='food' /></li>}
                        {item.properties.protein && <li><img src={Protein} alt='protein' /></li>}
                        {item.properties.carbs && <li><img src={Carbs} alt='carbs' /></li>}
                        {item.properties.indulge && <li><img src={Cake} alt='cake' /></li>}

                    </ul>
                </div>
            </div>

        </div>
    )
}

// {list.map(item => {
//     return (

//         <Card item={item} key={item.id} handleRefresh={handleRefresh} />
//     )
// })
// }

export default Indulge;