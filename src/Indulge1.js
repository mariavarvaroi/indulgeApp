import React from 'react';
import styles from './Styles.module.css';
import AddFoodForm from './components/AddFoodForm'

import { food } from './food'

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}


const ponderi = {
    '1': {
        'Breakfast': 0,
        'Lunch': 100,
        'Dinner': 0,
        'Snack': 0,
        'Snack2': 0,
    },
    '2': {
        'Breakfast': 0,
        'Lunch': 60,
        'Dinner': 40,
        'Snack': 0,
        'Snack2': 0,
    },
    '3': {
        'Breakfast': 30,
        'Lunch': 40,
        'Dinner': 30,
        'Snack': 0,
        'Snack2': 0,
    },
    '4': {
        'Breakfast': 25,
        'Lunch': 40,
        'Dinner': 25,
        'Snack': 10,
        'Snack2': 0,
    },
    '5': {
        'Breakfast': 25,
        'Lunch': 30,
        'Dinner': 25,
        'Snack': 10,
        'Snack2': 10,
    },
}


const generateMenu = function (maxCal, nrMeals, food) {

    const p = ponderi[nrMeals]

    const mealStructure = Object.entries(p)
    const meals = []

    const generateCard = (mealType, cardcalories) => {
        let card;
        const max = Math.max.apply(Math, food.map(function (food) { return food.calories; }))
        const min = Math.min.apply(Math, food.map(function (food) { return food.calories; }))
        if (cardcalories > max) {
            cardcalories = max
        }
        if (cardcalories < min) {
            cardcalories = min
        }
        if (mealType === 'Snack2') {
            mealType = 'Snack'
        }
        console.log('cardcalories', cardcalories)
        let cards = food.filter((food) => {
            return food.calories < (cardcalories + 50)
                && food.calories > (cardcalories - 50)
                && food.type.includes(mealType)
        })
        if (!cards.length) {
            cards = food.filter((food) => {
                return food.calories < (cardcalories - 50)
                    && food.type.includes(mealType)
            })
            let nextbestCard = cards.reduce((max, card) => max.calories > card.calories ? max : card)
            console.log('next best card', nextbestCard)
            return nextbestCard
        } else {
            card = cards[getRandomInt(cards.length)]
            return card
        }
    }

    for (let [type, percent] of mealStructure) {
        if (percent) {
            let cals = maxCal * percent / 100
            console.log('calorii pe masa', cals)
            let sum = 0

            while (sum < cals) {
                let interim = cals - sum
                const card = generateCard(type, interim)
                sum += card.calories
                card.type = type
                meals.push(card)
            }
            console.log('meals and sum', meals, sum)

        }

    }
    return meals;
}

const menuReducer = (state, action) => {
    switch (action.type) {
        case ('FOOD_INIT'):
            return
        case ('SET_MENU'):
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case ('FETCH_ERROR'):
            return
        default:
            throw new Error();
    }
}



const Indulge = () => {

    const [menu, dispatchMenu] = React.useReducer(
        menuReducer,
        { data: [], isLoading: false, isError: false }
    )


    const [settings, setSettings] = React.useState({
        maxCal: 0,
        nrMeals: 1,
        mealStructure: Object.entries(ponderi[1])
    })



    const handleCals = (e) =>
        setSettings({ ...settings, maxCal: Number(e.target.value) })

    const handleMeals = (e) => {
        let pondere = Object.entries(ponderi[e.target.value])
        setSettings({
            ...settings,
            nrMeals: Number(e.target.value),
            mealStructure: pondere
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (food.length) {
            const newMenu = generateMenu(settings.maxCal, settings.nrMeals, food)
            dispatchMenu({
                type: 'SET_MENU',
                payload: newMenu,
            })
        }
    }

    const handleChangeCalories = (e, id) => {
        let [foodwithID] = menu.filter(food => food.id === id);
        let index = menu.indexOf(foodwithID)
        foodwithID.calories = Number(e.target.value)
        let auxmenu = menu
        auxmenu.splice(index, 1, foodwithID)
        dispatchMenu({
            type: 'SET_MENU',
            payload: auxmenu,
        })
    }
    // conditie de adaugat la cautarea newMeals din handlerefresh
    // && (food.id !== id)
    const handleRefresh = (id, type, calories) => {
        let [foodwithID] = menu.data.filter(food => food.id === id);
        let index = menu.data.indexOf(foodwithID)
        let tip = type

        let newMeals = food.filter(food => {
            if (type === "Snack2") {
                tip = "Snack"
            }
            if (
                (food.type.includes(tip))
                && ((food.calories + 10) > calories) && ((food.calories - 10) < calories)
            ) {
                return true
            } else {
                return false
            }

        })
        if (newMeals.length) {
            const newMealIndex = getRandomInt(newMeals.length)
            const newMeal = { ...newMeals[newMealIndex], 'type': type }
            console.log('new meals', newMeals)
            let auxmenu = menu.data
            auxmenu.splice(index, 1, newMeal)
            console.log('index to be refreshed', index)
            dispatchMenu({
                type: 'SET_MENU',
                payload: auxmenu,
            })
        } else {
            const newMeal = foodwithID
            console.log('new meals', newMeals)
            let auxmenu = menu.data
            auxmenu.splice(index, 1, newMeal)
            console.log('index to be refreshed', index)
            dispatchMenu({
                type: 'SET_MENU',
                payload: auxmenu,
            })
        }
    }

    function totalCal(list) {
        let sum = 0
        list.map((item) =>
            sum += item.calories
        )
        return sum
    }
    let total = totalCal(menu.data)


    let types = [...new Set(menu.data.map(item => item.type))]


    return (
        <div>
            <div className={styles.app}>
                <span>Indulge App 2021</span>
            </div>
            <hr />
            <AddFoodForm />
            <hr />
            <Form handleCals={handleCals} handleMeals={handleMeals} handleSubmit={handleSubmit} isMaxCal={settings.maxCal} />
            <hr />

            <div>
                <p>Total Calorii: {total}<strong></strong></p>
            </div>
            <hr />

            {menu.data.length === 0 ? (<p>Completeaza formularul</p>) : (types.map(type => {
                return (
                    <Meal totalCal={totalCal} key={type} meal={menu.data} type={type} handleChangeCalories={handleChangeCalories} handleRefresh={handleRefresh} />
                )
            }))

            }

            <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>



        </div>
    )
}


const Meal = ({ meal, handleRefresh, handleChangeCalories, type, totalCal }) => {
    let mealOfType = meal.filter(item => item.type === type)
    let mealTotal = totalCal(mealOfType)
    return (
        <div className={styles.mealcard}>
            <h3>{type}</h3>
            {mealOfType.map(meal =>
                <Card key={meal.id} item={meal} handleChangeCalories={handleChangeCalories} handleRefresh={handleRefresh} />
            )}
            <h4>masa pe total {mealTotal}</h4>
        </div>
    )

}


const Card = ({ item, handleChangeCalories, handleRefresh }) => {
    return (
        <div key={item.id}>
            <h4>Name: {item.name}</h4>
            <label htmlFor='calories'>Calories: </label>
            <input id='calories' value={item.calories} onChange={(e) => handleChangeCalories(e, item.id)}></input>
            <button type="button" onClick={() => handleRefresh(item.id, item.type, item.calories)}>Refresh</button>
        </div>
    )
}



const Form = ({ handleCals, handleMeals, handleSubmit, isMaxCal }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            <label htmlFor={"maxcal"}>MaxCal</label>

            <input
                id={"maxcal"}
                type="number"
                onChange={handleCals}
            />
            <label htmlFor={"nrmeals"}>number of meals</label>
            <select onChange={handleMeals}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button type="submit" disabled={!isMaxCal}>Submit</button>
        </form>
    )
}

export default Indulge;