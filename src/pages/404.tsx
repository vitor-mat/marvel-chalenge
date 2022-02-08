import { NextPage } from 'next';
import Head from 'next/head';

import { useState } from 'react';

import { Header } from '../components/Header/index'

import * as S from '../../styles/style_404';


const SearchPage: NextPage = () => {

  const [apiParamName, setApiParamName] = useState("")

  const catchInputValue = (e: any) => {
    setApiParamName(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Marvel - 404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <S.MaxWidthSection>
        <Header show={true} />
        <S.Container>
          <span>404 OOPS...</span>
          <img src="/head_groot.svg" alt="head_groot.svg"/>
        </S.Container>
      </S.MaxWidthSection>
    </>
  )
}

export default SearchPage