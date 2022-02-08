import styled from 'styled-components';

export const MaxWidthSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 70px;

  span{
    font-size: 8rem;
    font-weight: 700;
    word-wrap: break-word;
    text-align: center;
  }

  img{
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 800px){
    span{
      font-size: 4rem;  
    }
  
    img{
      max-width: 200px;
    }
  }

  @media (max-width: 450px){
    span{
      font-size: 3rem;  
    }
  
    img{
      max-width: 100px;
    }
  }
`