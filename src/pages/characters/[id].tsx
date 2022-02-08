import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { useState } from 'react';

import { Header } from '../../components/Header/index';
import { TitleCards } from '../../components/TitleCards/index';
import FullScreenCard from '../../components/FullScreenCard/index';

import {
  api,
  time,
  publicKey,
  hash
} from '../api/axios';

import * as S from './style';

function createRoutersId(){
  let arr = []
  for(let i = 1; i <= 77; i++){
    arr.push(i.toString())
  }
  return arr
}

export const getStaticPaths: GetStaticPaths = async () => {

  const elementsId = createRoutersId()
  
  const paths = elementsId.map((value: string) => {
    return {
      params: { id: value }
    }
  })

  return ({
    paths,
    fallback: false
  })
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const id = await context.params.id
  const response = await api.get(`characters?limit=20&offset=${(Number(id) * 20).toFixed(0)}&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const charactersData = await response.data

  return ({
    props: {
      charactersData,
      id
    },
    revalidate: 300
  })
}


const CharactersParamsPage: NextPage = ({ charactersData, id }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName ] = useState(charactersData.data.results[0].name)
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
        <title>Marvel - Characters</title>
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
                <img src={value.thumbnail.path + "." + value.thumbnail.extension} alt="card"/>
                <span>{value.name}</span>
                <div></div>
              </S.Card>
            )
          })}
        </S.Container>
        <S.PaginationContainer>
          {id > 1 ? <Link href={`/characters/${Number(id) - 1}`}><a className="skip-btn">Back</a></Link> : <span className="skip-btn"></span>}
          <span>{id}</span>
          {id < 77 ? <Link href={`/characters/${Number(id) + 1}`}><a className="skip-btn">Next</a></Link> : <span className="skip-btn"></span>}
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default CharactersParamsPage