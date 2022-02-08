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

  const result = await api.get(`series?limit=20&offset=0&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const seriesData = await result.data;

  return {
    props: {
      seriesData
    },
    revalidate: 300
  }
}

const SeriesPage: NextPage = ({ seriesData }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(seriesData.data.results[0].title)
  let [thumbnail, setThumbnail] = useState(seriesData.data.results[0].thumbnail)
  let [start, setStart] = useState(seriesData.data.results[0].start)
  let [end, setEnd] = useState(seriesData.data.results[0].end)
  let [creators, setCreators] = useState(seriesData.data.results[0].creators.items)

  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, thumbnail: [], start: string, end: string, creators: []) => {
    setName(name)
    setThumbnail(thumbnail)
    setStart(start)
    setEnd(end)
    setCreators(creators)
  }

  return (
    <>
      <Head>
        <title>Marvel - Series</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FullScreenCard
        name={name}
        thumbnail={thumbnail}
        startDate={start}
        endDate={end}
        creators={creators}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <Header />
        <TitleCards titleText="Series"/>
        <S.Container>
          {seriesData.data.results.map((value: any) => {
            return (
              <S.Card
                key={value.id}
                onClick={() => {
                  handleScreen()
                  handleProperties(
                    value.title,
                    value.thumbnail,
                    value.startYear,
                    value.endYear,
                    value.creators.items
                  )
                }}
              >
                <img src={value.thumbnail.path + "." + value.thumbnail.extension} />
                <span>{value.title}</span>

              </S.Card>
            )
          })}
        </S.Container>
        <S.PaginationContainer>
          <span className="skip-btn"></span>
          <span>1</span>
          <Link href="/series/2"><a className="skip-btn">Next</a></Link>
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default SeriesPage