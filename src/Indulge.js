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
        snack2: 0,
    },
    '5': {
        breakfast: 25,
        lunch: 30,
        dinner: 25,
        snack: 10,
        snack2: 10,
    },
}


const Indulge = () => {

    const [maxCal, setMaxCal] = React.useState()
    const [nrMeals, setNrMeals] = React.useState(1)

    const [breakfast, setBreakFast] = React.useState([])
    const [lunch, setLunch] = React.useState([])
    const [dinner, setDinner] = React.useState([])
    const [snack, setSnack] = React.useState([])
    const [snack2, setSnack2] = React.useState([])
    const [calTotal, setCalTotal] = React.useState(0)
    const [cucu, setCucu] = React.useState('a')
    const [dayMenu, setDayMenu] = React.useState({})


    const [randomIndex, setRandomIndex] = React.useState({ breakfast: 0, lunch: 0, dinner: 0, snack: 0, snack2: 0 })


    React.useEffect(() => {
        const menu = []
        const arraymenu = {}


        breakfast[randomIndex.breakfast] && (arraymenu['breakfast'] = breakfast[randomIndex.breakfast])
        lunch[randomIndex.lunch] && (arraymenu['lunch'] = lunch[randomIndex.lunch])
        dinner[randomIndex.dinner] && (arraymenu['dinner'] = dinner[randomIndex.dinner])
        snack[randomIndex.snack] && (arraymenu['snack'] = snack[randomIndex.snack])
        snack2[randomIndex.snack2] && (arraymenu['snack2'] = snack2[randomIndex.snack2])

        let sum = menu.reduce((acc, cur) => acc + cur.calories, 0)

        console.log('arrmenu1', arraymenu)
        setCalTotal(sum)
        setDayMenu(arraymenu)
    }, [randomIndex])

    React.useEffect(() => {
        const array = [];
        dayMenu.breakfast && array.push(dayMenu.breakfast.calories);
        dayMenu.lunch && array.push(dayMenu.lunch.calories);
        dayMenu.dinner && array.push(dayMenu.dinner.calories);
        dayMenu.snack && array.push(dayMenu.snack.calories);
        let sum = array.reduce((acc, cur) => acc + cur, 0)
        setCalTotal(sum);
    }, [dayMenu])

    console.log('daymenu', dayMenu)

    const handleRefresh = (foodlist, tip) => {
        const newIndex = getRandomInt(foodlist.length);
        console.log('trage')
        if (foodlist.length > 1) {
            (newIndex !== randomIndex) ? setRandomIndex({ ...randomIndex, [tip]: newIndex }) : handleRefresh(foodlist, tip)
        } else if (foodlist.length === 1) {
            setRandomIndex(newIndex)
        } else {
            console.log('pe aici')
            return
        }

    }
    const handleChange = event => setCucu(event.target.value);

    const constructMealsList = (maxCal, nrMeals) => {
        const fillMeals = () => {

            const p = ponderi[nrMeals]
            // console.log('meals', p)

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
            const dnnr = list.filter(food => {
                return food.calories < (maxCal * (p.dinner + 1) / 100)
                    && food.type.includes('Dinner')
            })
            setDinner(dnnr)

            const snck = list.filter(food => {
                return food.calories < (maxCal * (p.snack + 1) / 100)
                    && food.type.includes('Snack')
            })
            setSnack(snck)
            const snck2 = list.filter(food => {
                return food.calories < (maxCal * (p.snack2 + 1) / 100)
                    && food.type.includes('Snack')
            })
            setSnack2(snck2)
        }
        fillMeals();
        handleRefresh(breakfast, 'breakfast')
        console.log('randomindex', randomIndex)
    }



    const handleSubmit = (e) => {
        constructMealsList(maxCal, nrMeals)
        e.preventDefault();
    }


    return (
        <div>
            <span>Indulge App 2021</span>
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
            {<p>total cal: {calTotal}</p>}

            {!breakfast.length
                ? (<p></p>)
                : (<Card foodType={"Breakfast"} cucuType={cucu} handleChange={handleChange} tip={'breakfast'} item={breakfast[randomIndex.breakfast]} handleRefresh={handleRefresh} foodlist={breakfast} />)}
            {!lunch.length
                ? (<p><strong>Maybe</strong></p>)
                : (<Card foodType={"Lunch"} cucuType={cucu} handleChange={handleChange} tip={'lunch'} item={lunch[randomIndex.lunch]} foodlist={lunch} handleRefresh={handleRefresh} />)}
            {!snack2.length
                ? (<div></div>)
                : (<Card foodType={"Snack"} cucuType={cucu} handleChange={handleChange} tip={'snack2'} item={snack2[randomIndex.snack2]} foodlist={snack2} handleRefresh={handleRefresh} />)}
            {!dinner.length
                ? (<p>  <strong>u would like</strong></p>)
                : (<Card foodType={"Dinner"} cucuType={cucu} handleChange={handleChange} tip={'dinner'} item={dinner[randomIndex.dinner]} foodlist={dinner} handleRefresh={handleRefresh} />)}
            {!snack.length
                ? (<p>  <strong>a snack!</strong></p>)
                : (<Card foodType={"Snack"} cucuType={cucu} handleChange={handleChange} tip={'snack'} item={snack[randomIndex.snack]} foodlist={snack} handleRefresh={handleRefresh} />)}



        </div>
    )
}


const Card = ({ item, foodType, handleRefresh, foodlist, tip, handleChange }) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.header}> {foodType} </div>
                <button type="button" onClick={() => handleRefresh(foodlist, tip)}>Refresh</button>
            </div>

            <div className={styles.body}>
                <div className={styles.cals}>
                    <label htmlFor="cals">Calories: </label>
                    <input id="cals"
                        value={item.calories}
                        type="text"
                        onChange={handleChange} />

                </div>
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


export default Indulge;