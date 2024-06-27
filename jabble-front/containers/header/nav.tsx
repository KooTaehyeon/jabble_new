'use client';
import styled from '@emotion/styled';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

function Nav() {
  const pathName = usePathname();

  return (
    <Div>
      <div className='NavItem'>
        <div>
          <Link href='/artists' style={{ marginRight: '14px' }}>
            Artists
          </Link>
        </div>
        <div
          className='underLine'
          style={pathName.includes('/artists') ? {} : { display: 'none' }}
        />
      </div>
      <div id='agencies' className='NavItem'>
        <Link href='/agencies'>agencies</Link>
        <div
          className='underLine'
          style={pathName.includes('/agencies') ? {} : { display: 'none' }}
        />
      </div>
      <div id='archive' className='NavItem'>
        <Link href='/archive'>Archive</Link>
        <div
          className='underLine'
          style={pathName.includes('/archive') ? {} : { display: 'none' }}
        />
      </div>
      <div className='NavItem'>
        <Link href='/inspiration'>Inspiration</Link>
        <div
          className='underLine'
          style={pathName.includes('/inspiration') ? {} : { display: 'none' }}
        />
      </div>
    </Div>
  );
}
export default Nav;

const Div = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;

  .NavItem {
    cursor: pointer;
    padding: 0 24px;
    width: 100%;
    height: 80px;
    line-height: 80px;
    position: relative;
    a,
    div {
      display: block;
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 600;
    }
    .underLine {
      position: absolute;
      width: calc(100% - 24px); // padding의 절반인 12px를 양옆으로 하기 위해
      height: 3px;
      background-color: black;
      top: calc(100% - 2px);
      left: 12px;
    }
  }
  .NavItem:after {
    content: '';
    display: block;
    height: 0px;
    width: calc(100% + 24px);
    margin: 0 auto;
    background-color: black;
    position: relative;
    top: 0px;
    left: -12px;
    transition: 0.2s;
  }

  .NavItem:hover:after {
    height: 3px;
    top: -2px;
  }

  .arrow-icon {
    width: 14px;
    height: 8px;
    position: absolute;
    top: 36px;
    left: 93px;
    transition: 0.2s;
  }

  .artistDropdown {
    position: absolute;
    top: calc(1px + 100%);
    background: white;
    width: 190px;
    padding: 10px 0px;
    border-radius: 4px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #edeeef;
    div {
      cursor: pointer;
      text-align: left;
      padding: 15px 0px 15px 17px;
      font-family: Montserrat;
      font-size: 15px;
      font-weight: 500;
      color: #5d5d5d;
    }
    div:hover {
      background-color: #000;
      color: #fff;
    }
  }

  @media (max-width: 1250px) {
    display: none;
  }
`;
