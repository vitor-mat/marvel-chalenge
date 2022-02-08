import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { useState } from 'react';

import { Header } from '../../components/Header/index';
import { TitleCards} from '../../components/TitleCards/index';
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
  for(let i = 1; i <= 3; i++){
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
  const response = await api.get(`events?limit=20&offset=${(Number(id) * 20).toFixed(0)}&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const eventsData = await response.data

  return ({
    props: {
      eventsData,
      id
    },
    revalidate: 300
  })
}


const CreatorsParamsPage: NextPage = ({ eventsData, id }: any) => {

  const [screenPosition, setScreenPosition] = useState(false)

  let [name, setName] = useState(eventsData.data.results[0].title)
  let [description, setDescription] = useState(eventsData.data.results[0].description)
  let [thumbnail, setThumbnail] = useState(eventsData.data.results[0].thumbnail)
  let [start, setStart] = useState(eventsData.data.results[0].start)
  let [end, setEnd] = useState(eventsData.data.results[0].end)
  let [creators, setCreators] = useState(eventsData.data.results[0].creators.items)
  let [comics, setComics] = useState(eventsData.data.results[0].comics.items)

  const handleScreen = () => {
    setScreenPosition(!screenPosition)
  }

  const handleProperties = (name: string, description: string, thumbnail: [], start: string, end: string, creators: [], comics: []) => {
    setName(name)
    setDescription(description)
    setThumbnail(thumbnail)
    setStart(start)
    setEnd(end)
    setCreators(creators)
    setComics(comics)
  }

  return (
    <>
      <Head>
        <title>Marvel - Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FullScreenCard
        name={name}
        description={description}
        thumbnail={thumbnail}
        startDate={start}
        endDate={end}
        creators={creators}
        comics={comics}
        screenPosition={screenPosition}
        handleScreen={handleScreen}
      />
      <S.MaxWidthSection>
        <Header />
        <TitleCards titleText="Events"/>
        <S.Container>
          {eventsData.data.results.map((value: any) => {
            return (
              <S.Card
                key={value.id}
                onClick={() => {
                  handleScreen()
                  handleProperties(
                    value.title,
                    value.description,
                    value.thumbnail,
                    value.start,
                    value.end,
                    value.creators.items,
                    value.comics.items
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
          {id > 1 ? <Link href={`/events/${Number(id) - 1}`}><a className="skip-btn">Back</a></Link> : <span className="skip-btn"></span>}
          <span>{id}</span>
          {id < 3 ? <Link href={`/events/${Number(id) + 1}`}><a className="skip-btn">Next</a></Link> : <span className="skip-btn"></span>}
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default CreatorsParamsPage