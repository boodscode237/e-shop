import {createContext, useState, useEffect} from "react";
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase.utils";

// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({})
    useEffect(() => {
        const getCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategories()
    }, [])
    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}