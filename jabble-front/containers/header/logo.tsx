import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { useCallback } from 'react';

function Logo() {
  const scrollToTop = useCallback(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  return (
    <Div>
      <Link
        href='/'
        onClick={() => {
          scrollToTop();
        }}
      >
        <Image src={'images/logo.svg'} alt='logo' fill />
      </Link>
    </Div>
  );
}

export default Logo;

const Div = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    position: relative !important;
    object-fit: cover;
    z-index: 0;
  }
  a {
    padding-right: 46px;
    img {
      display: block; // image에 잡힌 Padding 5px 없애기 위해
    }
  }
  @media (max-width: 1250px) {
    a {
      img {
        height: 25px;
      }
    }
  }
  @media (max-width: 480px) {
    > a {
      img {
        height: inherit;
      }
    }
  }
`;
