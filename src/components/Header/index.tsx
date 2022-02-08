import { NextPage } from 'next';
import Link from 'next/link';

import * as S from './style';

interface Props {
  show?: boolean;
}

export const Header: NextPage<Props> = ({ show }) => {
  return (
    <S.MaxSectionWidth>
      {show ? "" : (
        <S.LupaContainer>
          <Link href="/search"><a><img src="/lupa.svg" alt="lupa" /></a></Link>
        </S.LupaContainer>
      )}
      <S.Row>
        <S.Header>
          <Link href="/"><a><h1>Marvel</h1></a></Link>
        </S.Header>
      </S.Row>
    </S.MaxSectionWidth>
  )
}