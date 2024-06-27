import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Slide from '../../components/slide';
import { useWindowSize } from '@/hook/useWindowSize';
import styled from '@emotion/styled';
export const stringToSnakeCase = (word: string) => {
  return word?.replace(' ', '_').toLowerCase();
};
const occupationList = [
  'Photographer',
  'Filmmaker',
  'Model',
  'Hair',
  'Makeup',
  'Stylist',
  'Location',
];

export const toSnakeCase = (object: any) => {
  return Object.keys(object)
    .map((key) => {
      return { before: key, after: stringToSnakeCase(key) };
    })
    .reduce((cur, { before, after }) => {
      return Object.assign(cur, { [after]: object[before] });
    }, {});
};
function SearchList({ className, callback }: any) {
  const { innerWidth } = useWindowSize();
  const isTabletSize = innerWidth <= 1250;

  let occupationListDatas = [];
  for (var i = 0; i < occupationList.length; i++) {
    occupationListDatas.push({
      title: occupationList[i],
      occupation: stringToSnakeCase(occupationList[i]),
      image:
        process.env.PUBLIC_URL + `${stringToSnakeCase(occupationList[i])}.png`,
      idx: i,
    });
  }

  const searchListItems = occupationListDatas.map((SearchData) => {
    return (
      <div className='searchListItemWrapper' key={SearchData.idx}>
        <Link
          href={`/${SearchData.occupation}`}
          passHref
          onClick={() => {
            callback && callback();
          }}
        >
          <div
            className='searchImage'
            style={{ backgroundImage: `url(/${SearchData.image})` }}
          >
            <div className='searchTitle'>{SearchData.title}</div>
          </div>
        </Link>
      </div>
    );
  });

  const getSlide = (className: string) => {
    if (className === 'mainpage') {
      if (!isTabletSize) {
        return (
          <Slide
            itemWidth={220}
            totalItemLength={searchListItems.length}
            centerMargin={16}
            resetDependency={undefined}
          >
            {searchListItems}
          </Slide>
        );
      } else {
        return (
          <div className='searchListItemsForTablet'>{searchListItems}</div>
        );
      }
    }
    if (className === 'searchBar') {
      return (
        <Slide
          itemWidth={150}
          totalItemLength={searchListItems.length}
          centerMargin={11}
          resetDependency={undefined}
        >
          {searchListItems}
        </Slide>
      );
    }
    if (className === 'searchModal') {
      return searchListItems;
    }
  };

  return <Div className={className}>{getSlide(className)}</Div>;
}

export default SearchList;

const Div = styled.div`
  .slideWrapper {
    padding: 0 !important;
  }
  .slideRight {
    top: calc(102px / 2 - 58px / 2); // slide height/2 + img height/2
    right: calc(-58px / 2);
    img {
      width: 58px;
      height: 58px;
    }
  }
  .slideLeft {
    top: calc(102px / 2 - 58px / 2); // slide height/2 + img height/2
    left: calc(-58px / 2);
    img {
      width: 58px;
      height: 58px;
    }
  }
  .searchListItemWrapper {
    width: 220px;
    height: 102px;
    position: relative;

    > a {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .searchImage {
      text-align: center;
      line-height: 102px;
      width: 220px;
      border-radius: 4px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      transition: 0.2s;
      position: relative;
    }
    .searchTitle {
      color: #fff;
      font-family: Montserrat;
      font-size: 18px;
      font-weight: 600;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .searchImage:after {
      content: '';
      background-color: rgba(34, 31, 32, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .searchImage:hover:after {
      background-color: rgba(34, 31, 32, 0.2);
    }
  }
  .searchListItemWrapper:last-child {
    margin-right: 0;
  }

  &.searchBar {
    .slideRight {
      top: calc(70px / 2 - 40px / 2); // slide height/2 + img height/2
      right: calc(-40px / 2);
      img {
        width: 40px;
        height: 40px;
      }
    }
    .slideLeft {
      top: calc(70px / 2 - 40px / 2); // slide height/2 + img height/2
      left: calc(-40px / 2);
      img {
        width: 40px;
        height: 40px;
      }
    }

    .searchListItemWrapper {
      width: 150px;
      height: 70px;
      .searchImage {
        line-height: 70px;
        width: 150px;
        .searchTitle {
          font-size: 16px;
        }
      }
    }
  }

  &.searchModal::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  &.searchModal {
    display: flex;
    overflow: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    .searchListItemWrapper {
      width: 128px;
      height: 60px;
      margin-right: 8px;
      .searchImage {
        line-height: 60px;
        width: 128px;
      }
      .searchTitle {
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 600;
      }
    }
    .searchListItemWrapper:last-child {
      margin-right: 0;
    }
  }

  .searchListItemsForTablet {
    overflow: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 0 16px;
  }
  .searchListItemsForTablet::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
