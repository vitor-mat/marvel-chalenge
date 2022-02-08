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

  const result = await api.get(`events?limit=20&offset=0&ts=${time}&apikey=${publicKey}&hash=${hash}`);
  const eventsData = await result.data;

  return {
    props: {
      eventsData
    },
    revalidate: 300
  }
}

const EventsPage: NextPage = ({ eventsData }: any) => {

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
          <span className="skip-btn"></span>
          <span>1</span>
          <Link href="/events/2"><a className="skip-btn">Next</a></Link>
        </S.PaginationContainer>
      </S.MaxWidthSection>
    </>
  )
}

export default EventsPage