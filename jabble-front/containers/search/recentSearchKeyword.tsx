import styled from '@emotion/styled';
import Image from 'next/image';
export default function RecentSearchKeyword(props: any) {
  let date = new Date(props.time);

  return (
    <Div>
      <div
        className='keyword'
        onClick={(e) => props.clickSearchHistory(e, props.keyword)}
      >
        <span>{props.keyword}</span>
      </div>
      <div>
        <span className='time'>
          {date.getMonth() + 1}.{date.getDate()}
        </span>
        <span
          className='closeButton'
          onClick={(e) => props.deleteSearchHistory(e, props.index)}
        >
          <Image
            width={20}
            height={20}
            src={'images/x_icon.svg'}
            alt='delete'
          />
        </span>
      </div>
    </Div>
  );
}

const Div = styled.div`
  * {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.02px;
  }
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  .keyword {
    cursor: pointer;
  }
  .time {
    padding-right: 10px;
  }
  .closeButton {
    cursor: pointer;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: bottom;
  }
`;
