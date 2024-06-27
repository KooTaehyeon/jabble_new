'use client';
import styled from '@emotion/styled';
import Logo from '../containers/header/logo';
import Nav from '../containers/header/nav';
import AsideNav from '../containers/header/asideNav';
import SmallSearchInputForNav from '../containers/search/smallSearchInputForNav';
import { usePathname } from 'next/navigation';

function Header() {
  const path = usePathname();
  const shouldDisappear = path.includes('/signup');

  return (
    <>
      {shouldDisappear ? (
        <></>
      ) : (
        <GnbStyles>
          <FlexWrapperStyles>
            <FlexLeftStyles>
              <Logo />
              <Nav />
            </FlexLeftStyles>
            <FlexRightStyles>
              <SmallSearchInputStyles>
                <SmallSearchInputForNav />
              </SmallSearchInputStyles>
              <AsideNav />
            </FlexRightStyles>
          </FlexWrapperStyles>
        </GnbStyles>
      )}
    </>
  );
}

export default Header;

const GnbStyles = styled.div`
  width: 100%;
  min-width: 324px;
  /* position: sticky; */
  /* top: 0; */
  background: white;
  z-index: 10;
  border-bottom: 1px solid #e9e9e9;
`;

const FlexWrapperStyles = styled.div`
  max-width: 1400px;
  width: 70%;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  text-align: center;
  @media (max-width: 900px) {
    width: 95%;
  }
  @media (max-width: 1400px) {
    width: 80%;
  }
`;

const FlexLeftStyles = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const FlexRightStyles = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SmallSearchInputStyles = styled.div`
  display: none;

  @media (min-width: 1250px) {
    display: block;
  }
`;
