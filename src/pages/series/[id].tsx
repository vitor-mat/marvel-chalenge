import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
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

function createRoutersId(){
  let arr = []
  for(let i = 1; i <= 636; i++){
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
  const response = await api.get(`series?limit=20&offset=${(Number(id)*20).toFixed(0)}&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const seriesData = await response.data

  return ({
    props: {
      seriesData,
      id
    },
    revalidate: 300
  })
}


const SeriesParamsPage: NextPage = ({ seriesData, id }: any) => {

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
                    value.start,
                    value.end,
                    value.creators.items,
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
          {id > 1 ? <Link href={`/series/${Number(id) - 1}`}><a className="skip-btn">Back</a></Link> : <span className="skip-btn"></span>}
          <span>{id}</span>
          {id < 636 ? <Link href={`/series/${Number(id) + 1}`}><a className="skip-btn">Next</a></Link> : <span className="skip-btn"></span>}
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default SeriesParamsPage