import type { NextPage, GetStaticProps } from 'next';
import Link from 'next/link'
import Head from 'next/head'

import { useState } from 'react';

import { Header } from '../../components/Header/index';
import { TitleCards } from '../../components/TitleCards/index';
import FullScreenCard from '../../components/FullScreenCard/index';

import * as S from './style';

import {
  api,
  time,
  publicKey,
  hash
} from '../api/axios';

export const getStaticProps: GetStaticProps = async (context) => {

  const result = await api.get(`characters?limit=20&offset=0&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const charactersData = await result.data;

  return {
    props: {
      charactersData
    },
    revalidate: 10
  }
}

const Characters: NextPage = ({ charactersData }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(charactersData.data.results[0].name)
  let [description, setDescription] = useState(charactersData.data.results[0].description)
  let [series, setSeries] = useState(charactersData.data.results[0].series.items)
  let [thumbnail, setThumbnail] = useState(charactersData.data.results[0].thumbnail)

  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, description: string, series: [], thumbnail: []) => {
    setName(name)
    setDescription(description)
    setSeries(series)
    setThumbnail(thumbnail)
  }

  return (
    <>
      <Head>
        <title>Marvel - characters</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FullScreenCard
        name={name}
        description={description}
        series={series}
        thumbnail={thumbnail}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <Header />
        <TitleCards titleText="Characters"/>
        <S.Container>
          {charactersData.data.results.map((value: any) => {
            return (
              <S.Card
                key={value.id}
                onClick={() => {
                  handleScreen()
                  handleProperties(value.name, value.description, value.series.items, value.thumbnail)
                }}
              >
                <img src={value.thumbnail.path + "." + value.thumbnail.extension} />
                <span>{value.name}</span>
              </S.Card>
            )
          })}
        </S.Container>
        <S.PaginationContainer>
          <span className="skip-btn"></span>
          <span>1</span>
          <Link href="/characters/2"><a className="skip-btn">Next</a></Link>
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default Characters
