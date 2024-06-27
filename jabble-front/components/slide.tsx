import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import styled from '@emotion/styled';

export default function Slide({
  itemWidth,
  totalItemLength,
  centerMargin,
  resetDependency,
  children,
}: any) {
  const [translateCoordinate, setTranslateCoordinate] = useState(0);
  const [overflowWidth, setOverflowWidth] = useState(0);
  useEffect(() => {
    let slide = document.getElementById('slide');
    if (slide === null) return;
    let viewWidth = slide.offsetWidth;
    let slideWidth =
      itemWidth * totalItemLength + centerMargin * (totalItemLength - 1);
    setOverflowWidth(slideWidth - viewWidth);
    // setTranslateCoordinate(0)
    if (centerMargin) {
      for (let i = 0; i < slide.children.length - 1; i++) {
        if (slide.children[i] instanceof HTMLElement) {
          const childElement = slide.children[i] as HTMLElement;
          childElement.style.marginRight = centerMargin + 'px';
        }
      }
    }
  }, [itemWidth, totalItemLength, centerMargin, children]);

  useEffect(() => {
    setTranslateCoordinate(0);
  }, [resetDependency]);

  const slideLeft = () => {
    translateCoordinate - (itemWidth + centerMargin) > 0
      ? setTranslateCoordinate(translateCoordinate - (itemWidth + centerMargin))
      : setTranslateCoordinate(0);
  };

  const slideRight = () => {
    translateCoordinate + itemWidth + centerMargin < overflowWidth
      ? setTranslateCoordinate(translateCoordinate + (itemWidth + centerMargin))
      : setTranslateCoordinate(overflowWidth);
  };

  return (
    <Div>
      {translateCoordinate !== 0 && (
        // {true &&
        <div
          className='slideLeft'
          onClick={(e) => {
            e.stopPropagation();
            slideLeft();
          }}
        >
          <Image
            width={20}
            height={20}
            src={'images/Arrow_Circle_Left.svg'}
            alt='arrow_left'
          />
        </div>
      )}
      <div className='slideWrapper'>
        <div
          id='slide'
          style={{ transform: `translateX(-${translateCoordinate}px)` }}
        >
          {/* {children.map((chlid)=>{
            return(
              <div>{chlid}</div>
            )
          })} */}
          {children}
        </div>
      </div>
      {overflowWidth !== translateCoordinate && overflowWidth > 0 && (
        // {true &&
        <div
          className='slideRight'
          onClick={(e) => {
            e.stopPropagation();
            slideRight();
          }}
        >
          <Image
            width={20}
            height={20}
            src={'Arrow_Circle_Right.svg'}
            alt='arrow_right'
          />
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  .slideWrapper {
    overflow: hidden;
  }
  #slide {
    display: flex;
    align-items: center;
    transition: 0.2s;
  }
  .slideLeft,
  .slideRight {
    position: absolute;
    z-index: 1;
    img {
      display: block;
    }
  }
`;
