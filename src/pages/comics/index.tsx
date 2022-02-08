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

  const result = await api.get(`comics?limit=20&offset=0&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const comicsData = await result.data;

  return {
    props: {
      comicsData
    },
    revalidate: 300
  }
}

const ComicsPage: NextPage = ({ comicsData }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(comicsData.data.results[0].title)
  let [description, setDescription] = useState(comicsData.data.results[0].description)
  let [pageCount, setPageCount] = useState(comicsData.data.results[0].pageCount)
  let [thumbnail, setThumbnail] = useState(comicsData.data.results[0].thumbnail)
  let [creators, setCreators] = useState(comicsData.data.results[0].creators.items)

  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, description: string, thumbnail: [], pageCount: string, creators: []) => {
    setName(name)
    setDescription(description)
    setThumbnail(thumbnail)
    setPageCount(pageCount)
    setCreators(creators)
    console.log(creators)
  }

  return (
    <>
      <Head>
        <title>Marvel - Comics</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FullScreenCard
        name={name}
        description={description}
        thumbnail={thumbnail}
        pageCount={pageCount}
        creators={creators}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <Header />
        <TitleCards titleText="Comics" />
        <S.Container>
          {comicsData.data.results.map((value: any) => {
            return (
              <S.Card
                key={value.id}
                onClick={() => {
                  handleScreen()
                  handleProperties(
                    value.title,
                    value.description,
                    value.thumbnail,
                    value.pageCount,
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
          <Link href="/comics/2"><a className="skip-btn">Next</a></Link>
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default ComicsPage