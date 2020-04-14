import React from 'react';
import './App.css';
import { food as database } from './food'
import axios from 'axios'

// const settings = {
//   maxcal: 1700,
//   meals_no: 5
// }

const API_ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=`

const useSemiPersistenceState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )
  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])
  return [value, setValue]
}
const initialFoods = database;

const getAsyncStories = () =>
  new Promise(resolve => setTimeout(() => resolve({ data: { foods: initialFoods } }), 2000));

const foodsReducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'FOODS_FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      }
    case 'FOODS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    case 'REMOVE_FOOD':
      return {
        ...state,
        data: state.data.filter(
          food => action.payload.idMeal !== food.idMeal)
      }
    case 'ADD_FOOD':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      }
    case 'NOT_FOUND':
      return {
        ...state,
        isLoading: false,
        isError: true,
        notFound: true,
      }
    default:
      throw new Error();
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const [maxCal, setMaxCal] = useSemiPersistenceState('cal', 1200)

  const [foodList, dispatchFoods] = React.useReducer(
    foodsReducer, { data: [], isLoading: false, isError: false }
  )

  const [newFood, setNewFood] = React.useState({ data: [] })

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  const handleFetchStories = React.useCallback(async () => {

    dispatchFoods({ type: 'FOODS_INIT' })
    try {

      const result = await axios.get(url)

      if (result.data.meals === null || undefined || '') {
        dispatchFoods({ type: 'NOT_FOUND' })
      } else {
        dispatchFoods({
          type: 'FOODS_FETCH_SUCCESS',
          payload: result.data.meals
        })
      }
    } catch {
      dispatchFoods({ type: 'FOODS_FETCH_FAILURE' })
    }


    // axios
    //   .get(url)
    //   .then(result => {
    //     dispatchFoods({
    //       type: 'FOODS_FETCH_SUCCESS',
    //       payload: result.data.meals
    //     })
    //   }).catch(() => dispatchFoods({ type: 'FOODS_FETCH_FAILURE' }));

  }, [url])

  React.useEffect(() => {
    handleFetchStories()
  }, [handleFetchStories])

  const setCals = (e) => {
    setMaxCal(e.target.value)
  }

  const handleRemoveFood = item => {
    dispatchFoods({
      type: 'REMOVE_FOOD',
      payload: item
    })
  }

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  }

  // const searchedFood = foodList.data.filter(food =>
  //   food.strMeal
  //     .toLowerCase()
  //     .includes(searchTerm.toLocaleLowerCase())
  // )

  const handleSearchSubmit = (e) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)
    e.preventDefault();
  }
  // ************************************************** //
  return (
    <div className="App">
      <p>Helo</p>

      <InputWithLabel
        onInputChange={setCals}
        value={maxCal}
        id={'cals'}
        type={'number'}
        isFocused
      >
        <b>Input the max number of calories:</b>
      </InputWithLabel>

      <form onSubmit={handleSearchSubmit}>
        <InputWithLabel
          onInputChange={handleSearchInput}
          value={searchTerm}
          id={'Search'}

        >
          <strong>Search:</strong>
        </InputWithLabel>
        <button type="submit" disabled={!searchTerm} >
          Submit
      </button>
      </form>

      {foodList.isError ? (
        <p>something went wrong</p>
      ) : (
          !foodList.isLoading ? (
            <List list={foodList.data} onRemoveItem={handleRemoveFood} />
          ) : (
              <p>loading...</p>
            )
        )
      }
      {foodList.notFound && <p>invalid search</p>}

    </div>
  );
}

const SearchForm = ({ onSearchSubmit, onSearchInput, searchTerm }) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        onInputChange={onSearchInput}
        value={searchTerm}
        id={'Search'}

      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button type="submit" disabled={!searchTerm} >
        Submit
      </button>
    </form>
  )
}

const List = ({ list, onRemoveItem }) =>
  list.map(item =>
    <Item key={item.idMeal}
      item={item}
      onRemoveItem={onRemoveItem} />
  )


const Item = ({ item, onRemoveItem }) => {

  return (
    <div>
      <span>{item.strMeal}</span>
      <span>calories: {item.strIngredient1}</span>
      <span>quantity: {item.strMeasure1}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </div >)
}


const InputWithLabel = ({ value, onInputChange, id, type, children, isFocused }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      &nbsp;
      <input
        id={id}
        onChange={onInputChange}
        value={value}
        type={type}
        autoFocus={isFocused}
      />
    </>
  )
}




export default App;
