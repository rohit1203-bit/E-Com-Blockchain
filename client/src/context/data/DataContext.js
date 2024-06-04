import { createContext, useReducer } from "react";
import dataReducers from './dataReducers'

const DataContext = createContext({})

const INITIAL_STATE = {
  data: []
}

export const DataProvider = ({ children }) => {
  const [products, dispatch] = useReducer(dataReducers, INITIAL_STATE)

  return (
    <DataContext.Provider value={{ dispatch, products }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;