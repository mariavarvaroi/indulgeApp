import React from 'react';
import styles from './Styles.module.css';
import Food from './svg/watermelon.svg'
import Cake from './svg/cake.svg'
import Protein from './svg/fries.svg'
import Carbs from './svg/meat.svg'
import Digest from './svg/ok.svg'
import { food } from './MOCK_DATA'

const list = food;
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}



const Indulge = () => {

    const [maxCal, setMaxCal] = React.useState()
    const [nrMeals, setNrMeals] = React.useState(1)

    const [breakFast, setBreakFast] = React.useState([])
    const [lunch, setLunch] = React.useState([])
    const [dinner, setDinner] = React.useState([])
    const [snack, setSnack] = React.useState([])
    const [snack2, setSnack2] = React.useState([])




    const constructMealsList = (maxCal, nrMeals) => {

        const ponderi = {
            '1': {
                breakfast: 0,
                lunch: 100,
                dinner: 0,
                snack: 0,
                snack2: 0,
            },
            '2': {
                breakfast: 0,
                lunch: 60,
                dinner: 40,
                snack: 0,
                snack2: 0,
            },
            '3': {
                breakfast: 30,
                lunch: 40,
                dinner: 30,
                snack: 0,
                snack2: 0,
            },
            '4': {
                breakfast: 25,
                lunch: 40,
                dinner: 25,
                snack: 10,
                snack2: 10,
            },
            '5': {
                breakfast: 25,
                lunch: 30,
                dinner: 25,
                snack: 10,
                snack2: 10,
            },
        }
        const p = ponderi[nrMeals]
        console.log('meals', p)

        const brkfst = list.filter(food => {
            return food.calories < (maxCal * (p.breakfast + 1) / 100)
                && food.type.includes('Breakfast')
        })
        setBreakFast(brkfst)

        const lnch = list.filter(food => {
            return food.calories < (maxCal * (p.lunch + 1) / 100)
                && food.type.includes('Lunch')
        })
        setLunch(lnch)
        // console.log(lunch)
        const dnnr = list.filter(food => {
            return food.calories < (maxCal * (p.dinner + 1) / 100)
                && food.type.includes('Dinner')
        })
        setDinner(dnnr)
        // console.log(dinner)

        const snck = list.filter(food => {
            return food.calories < (maxCal * (p.snack + 1) / 100)
                && food.type.includes('Snack')
        })
        setSnack(snck)
        setSnack2(snck)
        // console.log(snack)

    }

    console.log('b', breakFast, 'l', lunch, 'd', dinner, 's', snack)


    const handleSubmit = (e) => {
        constructMealsList(maxCal, nrMeals)
        e.preventDefault();
    }

    return (
        <div>
            <span>Indulge App</span>
            <hr />
            <form onSubmit={handleSubmit}>

                <label htmlFor={"maxcal"}>MaxCal</label>

                <input
                    id={"maxcal"}
                    type="number"
                    onChange={(e) => setMaxCal(e.target.value)}
                />
                <label htmlFor={"nrmeals"}>number of meals</label>
                <select onChange={(e) => setNrMeals(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <button type="submit" disabled={!maxCal}>Submit</button>
            </form>
            <hr />

            {!breakFast.length ? (<p></p>) : (<Meal foodType={"Breakfast"} foodTypeList={breakFast} />)}
            {!lunch.length ? (<p>    <strong>Maybe</strong></p>) : (<Meal foodType={"Lunch"} foodTypeList={lunch} />)}
            {!snack2.length ? (<div></div>) : (<Meal foodType={"Snack"} foodTypeList={snack} />)}
            {!dinner.length ? (<p>  <strong>u would like</strong></p>) : (<Meal foodType={"Dinner"} foodTypeList={dinner} />)}
            {!snack.length ? (<p>  <strong>a snack!</strong></p>) : (<Meal foodType={"Snack"} foodTypeList={snack} />)}



        </div>
    )
}

const Meal = ({ foodType, foodTypeList }) => {

    // const foodTypeList = list.filter(food =>
    //     food.type.includes(foodType))


    const [randomIndex, setRandomIndex] = React.useState(0)


    const handleRefresh = () => {
        const newIndex = getRandomInt(foodTypeList.length);
        if (foodTypeList.length > 1) {
            (newIndex !== randomIndex) ? setRandomIndex(newIndex) : handleRefresh()
        } else if (foodTypeList === 1) {
            setRandomIndex(newIndex)
        } else {
            return
        }

    }
    return (
        <Card item={foodTypeList[randomIndex]} handleRefresh={handleRefresh} foodType={foodType} />
    )
}

const Card = ({ item, foodType, handleRefresh }) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.header}>It's a {foodType} </div>
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