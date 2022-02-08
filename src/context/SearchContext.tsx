import { NextPage } from 'next';

import { useState, createContext, Dispatch } from 'react';

interface contextValue{
  apiParamName: string;
  setApiParamName: Dispatch<string>
}

export const SearchValue = createContext<contextValue>({
  apiParamName: "",
  setApiParamName: () => {}
})

export const SearchContext: NextPage = ({ children }: any) => {

  const [apiParamName, setApiParamName] = useState("")

  return(
    <SearchValue.Provider value={{apiParamName, setApiParamName}}>
      {children}
    </SearchValue.Provider>
  )
}