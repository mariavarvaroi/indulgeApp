import React from 'react'
import styles from '../Styles.module.css';
import { foodProperties, typesOfFood } from './constants'
import firebase from '../firebase'

const db = firebase.firestore()

const AddFoodForm = () => {

    const [foodAddedByUser, setFoodAddedByUser] = React.useState({})

    const [properties, setProperties] = React.useState({
        checkedItems: new Map(),
    })

    const [typesOfMeals, setTypesOfMeals] = React.useState({
        checkedItems: new Map(),
    })

    const handleChangeProperties = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setProperties((state) => ({ checkedItems: state.checkedItems.set(item, isChecked) }))
    }

    const handleChangeTypes = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setTypesOfMeals((state) => ({ checkedItems: state.checkedItems.set(item, isChecked) }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let props = [];
        const writeProps = (value, key) => {
            if (value) {
                props.push(key);
            }
        }
        let types = [];
        const writeTypes = (value, key) => {
            if (value) {
                types.push(key);
            }
        }
        properties.checkedItems.forEach(writeProps);
        typesOfMeals.checkedItems.forEach(writeTypes);

        // setFoodAddedByUser({
        //     ...foodAddedByUser,
        //     properties: [...props],
        //     type: [...types],
        // })

        db.collection('foods').doc().set(
            {
                name: foodAddedByUser.name,
                description: foodAddedByUser.description,
                quantity: foodAddedByUser.quantity,
                calories: foodAddedByUser.calories,
                type: types,
                properties: props,
                added: Date.now()
            }
        ).then(function () {
            console.log("Food added successfully :thumbsup:!");
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <div>

            <form onSubmit={handleFormSubmit} className={styles.form}>

                <label htmlFor={"nume"}>Food Name:</label>
                <input
                    id={"nume"}
                    type="text"
                    onChange={(e) => setFoodAddedByUser({ ...foodAddedByUser, name: e.target.value })}
                />

                <label htmlFor={"description"}>Description:</label>
                <input
                    id={"description"}
                    type="text"
                    onChange={(e) => setFoodAddedByUser({ ...foodAddedByUser, description: e.target.value })}
                />

                <label htmlFor={"quantity"}>Quantity in grams:</label>
                <input
                    id={"quantity"}
                    type="number"
                    onChange={(e) => setFoodAddedByUser({ ...foodAddedByUser, quantity: e.target.value })}
                />

                <label htmlFor={"calories"}>Calories:</label>
                <input
                    id={"calories"}
                    type="number"
                    onChange={(e) => setFoodAddedByUser({ ...foodAddedByUser, calories: e.target.value })}
                />
                <CheckboxContainer
                    checkboxes={foodProperties}
                    handleChange={handleChangeProperties}
                    boxes={properties} />
                <CheckboxContainer
                    checkboxes={typesOfFood}
                    handleChange={handleChangeTypes}
                    boxes={typesOfMeals} />

                <button type="submit">ADD</button>
            </form>
        </div>


    )
}


const CheckboxContainer = ({ checkboxes, handleChange, boxes }) => {

    return (
        <React.Fragment>
            {
                checkboxes.map(item => (
                    <label key={item.key}>
                        {item.label}
                        <Checkbox name={item.name} checked={boxes.checkedItems.get(item.name)} onChange={handleChange} />
                    </label>
                ))
            }
        </React.Fragment>
    );

}
const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
);

export default AddFoodForm;