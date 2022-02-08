import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';

import { useState, useEffect } from 'react';

import { Header } from '../../components/Header/index'
import { CardsContainer } from '../../components/CardsContainer/index';

import * as S from './style';

import {
  api,
  time,
  publicKey,
  hash
} from '../api/axios';

export const getStaticPaths: GetStaticPaths = async () => {

  const paths = [
    { params: { id: "1" } }
  ]

  return ({
    paths,
    fallback: true
  })
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = context.params.id
  const charactersApi = await api.get(`characters?nameStartsWith=${id}&limit=100&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const charactersData = await charactersApi.data

  return ({
    props: {
      charactersData: charactersData,
      id
    },
    revalidate: 300
  })
}

const SearchParamsPage: NextPage = ({ charactersData, id }: any) => {

  useEffect(() => {
    console.log(charactersData)
    console.log("entrei")
  },[])

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
    setInputData("")
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
        <CardsContainer title="Characters" apiData={charactersData.data.results} searchData={id}/>
      </S.MaxWidthSection>
    </>
  )
}

export default SearchParamsPage
