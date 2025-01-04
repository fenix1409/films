import { useState } from "react";
import { createContext } from "react";

export const Context = createContext()

export const ActionContext = ({children}) => {
    const [likedList, setLikedList] = useState([])
    const [savedList, setSavedList] = useState([])
    return(
        <Context.Provider value={{likedList, setLikedList, savedList, setSavedList}}>{children}</Context.Provider>
    )
}