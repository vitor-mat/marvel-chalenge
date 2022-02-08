import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

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

  const result = await api.get(`creators?limit=20&offset=0&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const creatorsData = await result.data;

  return {
    props: {
      creatorsData
    },
    revalidate: 300
  }
}

const CreatorsPage: NextPage = ({ creatorsData }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(creatorsData.data.results[0].fullname)
  let [thumbnail, setThumbnail] = useState(creatorsData.data.results[0].thumbnail)
  let [comics, setComics] = useState(creatorsData.data.results[0].comics.items)

  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, thumbnail: [], comics: []) => {
    setName(name)
    setThumbnail(thumbnail)
    setComics(comics)
  }

  return (
    <>
      <Head>
        <title>Marvel - Creators</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FullScreenCard
        name={name}
        thumbnail={thumbnail}
        comics={comics}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <Header />
        <TitleCards titleText="Creators"/>
        <S.Container>
          {creatorsData.data.results.map((value: any) => {
            return (
              <S.Card
                key={value.id}
                onClick={() => {
                  handleScreen()
                  handleProperties(
                    value.fullName,
                    value.thumbnail,
                    value.comics.items
                  )
                }}
              >
                <img src={value.thumbnail.path + "." + value.thumbnail.extension} />
                <span>{value.fullName}</span>

              </S.Card>
            )
          })}
        </S.Container>
        <S.PaginationContainer>
          <span className="skip-btn"></span>
          <span>1</span>
          <Link href="/creators/2"><a className="skip-btn">Next</a></Link>
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default CreatorsPage