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
  margin: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 70px;
`

export const Card = styled.div`
  width: 230px;
  height: 400px;
  cursor: pointer;
  
  img{
    width: 230px;
    height: 330px;
    margin-bottom: 10px;
    transition: .1s linear;
  }

  span{
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &:hover{
    img{
      transform: translateY(-10px);
    }
    span{
      color: #e62429;
    }
  }
`


export const PaginationContainer = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  justify-content: center;
  gap: 40px;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 40px;

  .skip-btn{
    cursor: pointer;
    text-decoration: none;
  }

  .skip-btn:hover{
      color: #e62429;
    }
  }
`