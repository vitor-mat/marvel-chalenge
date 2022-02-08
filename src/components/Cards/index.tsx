import { NextPage } from 'next';

import Link from 'next/link';

import * as S from './style';

export const Cards: NextPage = () => {
  return (
    <S.MaxWidthSection>
      <S.Container>
        <img src="/head_groot.svg" alt="headgroot.svg"/>
        <S.CardCharacters>
          <Link href="/characters"><a>Characters</a></Link>
        </S.CardCharacters>
        <S.CardComics>
          <Link href="/comics"><a>Comics</a></Link>
        </S.CardComics>
        <S.CardCreators>
          <Link href="/creators"><a>Creators</a></Link>
        </S.CardCreators>
        <S.CardEvents>
          <Link href="/events"><a>Events</a></Link>
        </S.CardEvents>
        <S.CardSeries>
          <Link href="/series"><a>Series</a></Link>
        </S.CardSeries>
      </S.Container>
    </S.MaxWidthSection>
  )
}