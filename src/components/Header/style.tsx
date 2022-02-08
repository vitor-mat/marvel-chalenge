import styled from 'styled-components';

export const MaxSectionWidth = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: black;
  position: relative;
`

export const LupaContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  right: 2%;
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    width: 70px;
    height: 70px;
  }
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 26px;

  @media only screen and (min-width: 820px){
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    max-width: 1440px;
  }
`

export const Header = styled.div`
  grid-column-start: 1;
  grid-column-end: 13;
  background: red;
  color: white;
  font-size: 2rem;

  a{
    text-decoration: none;
  }

  @media only screen and (min-width: 820px){
    font-size: 2rem;
  }
`