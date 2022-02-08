import { NextPage } from 'next';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';

import { useState } from 'react';

import { Header } from '../../components/Header/index'

import * as S from './style';


const SearchPage: NextPage = () => {

  const [apiParamName, setApiParamName] = useState("")
  const [inputData, setInputData] = useState("")
  const router = useRouter()

  const catchInputValue = (e: any) => {
    setApiParamName(e.target.value)
    setInputData(e.target.value)
  }

  const handleSearchEnter = (e: any) => {
    if(e.key == "Enter") router.push(`/search/${apiParamName}`)
  }

  const clearInput = () => {
    setApiParamName("")
  }

  return (
    <>
      <Head>
        <title>Marvel - Search</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <S.MaxWidthSection>
        <Header show={true} />
        <S.Container>
          <input
            type="text"
            placeholder="Type here"
            onChange={e => catchInputValue(e)}
            onKeyDown={e => handleSearchEnter(e)}
            value={inputData} 
          />
          <Link href={`/search/${apiParamName}`}>
            <a
              onClick={clearInput}
            >
              <button>
                Search
              </button>
            </a>
          </Link>
        </S.Container>
      </S.MaxWidthSection>
    </>
  )
}

export default SearchPage