import React from 'react'
import axios from 'axios'

const initialStories = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(localStorage.getItem(key) || initialState)
    React.useEffect(() => {
        localStorage.setItem(key, value)

    }, [value, key])

    return [value, setValue]
}

const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'FETCH_SUCCES':
            console.log('payload-ul este', action.payload)
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'REMOVE':
            return {
                ...state,
                data: state.data.filter(
                    story => action.payload.objectID !== story.objectID
                )
            }
        default:
            throw new Error();
    }
}

const App1 = () => {

    const [stories, dispatchStories] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false })

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '')
    const [calories, setCalories] = useSemiPersistentState('calories', '')
    const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)

    const fetchStories = React.useCallback(() => {
        dispatchStories({
            type: 'INIT'
        })

        axios.get(url)
            .then(result => {
                dispatchStories({
                    type: 'FETCH_SUCCES',
                    payload: result.data.hits
                })
            }
            )
            .catch(err => {
                console.log('erorare', err)
                dispatchStories({ type: 'FETCH_FAILURE' })
            })


    }, [url])

    React.useEffect(() => {
        fetchStories()
    }, [fetchStories])

    const handleCalories = (e) => {
        setCalories(e.target.value)
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleSearchSubmit = () => {
        setUrl(`${API_ENDPOINT}${searchTerm}`)
    }
    console.log('url', url)

    const handleRemoveStories = item => {
        dispatchStories({
            type: 'REMOVE',
            payload: item,
        })
    }



    return (
        <div>
            <p>Hacker Stories</p>

            <InputWithLabel id={'calories'}
                value={calories}
                type={'number'}
                onInputChange={handleCalories}
                isFocused>
                Calories:
                </InputWithLabel>
            <InputWithLabel id={'search'}
                value={searchTerm}
                onInputChange={handleChange}
            >
                <strong>Search:</strong>
            </InputWithLabel>
            <span>
                <button type='button'
                    disabled={!searchTerm}
                    onClick={handleSearchSubmit}
                >Search</button>
            </span>

            <hr />
            {stories.isError && <p>Error</p>}
            {
                stories.isLoading ? (
                    <p>Loading..</p>
                ) : (
                        <List list={stories.data} handleRemoveStories={handleRemoveStories} />
                    )
            }

        </div >
    )
}

const InputWithLabel = ({ value, onInputChange, id, type = 'text', children, isFocused }) => {

    return (
        <div>
            <label htmlFor={id}>{children}</label>
            <input id={id}
                type={type}
                onChange={onInputChange}
                value={value}
                autoFocus={isFocused} />

        </div>
    )
}

const List = ({ list, handleRemoveStories }) =>
    list.map(item => {
        return <Item key={item.objectID}
            item={item}
            handleRemoveStories={handleRemoveStories} />
    })



const Item = ({ item, handleRemoveStories }) => {
    const handleRemoveItem = () => handleRemoveStories(item)
    return (
        <div>
            <span>{item.title}</span>
            <span>
                <a href={item.url}>{item.url}</a></span>
            <span>{item.author}</span>
            <button onClick={handleRemoveItem}>Dismiss</button>
        </div>
    )
}





export default App1
