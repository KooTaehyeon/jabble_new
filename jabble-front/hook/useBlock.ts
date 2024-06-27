import { createContext, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const BlockContext = createContext();

// blocking 시 setState가 적용되지않아서 잠시 포기

export const BlockProvider = ({ children }) => {
  const [isBlock, setBlock] = useState(false)

  useEffect(()=>{
    isBlock ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''
    return ()=>{document.body.style.overflow = ''}
  },[isBlock])

  const getContent = () => {
    return (
      <Div>
        <div className="block-ui-container">
          <div className="block-ui-overlay" />
          <div className="block-ui-message-container">
            <div className="block-ui-message">
              <h4>{typeof (isBlock) === 'string' ? isBlock : "Loading..."}</h4>
              <div className="loading-indicator">
                <svg id="indicator" viewBox="0 0 100 100">
                  <circle id="circle" cx="50" cy="50" r="45" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Div>
    )
  }
  const BlockUI = () => {
    return getContent()
  }

  const value = useMemo(
    () => ({ isBlock, setBlock, BlockUI }),
    /*eslint-disable */
    [isBlock]
    /*eslint-enable */
  );

  return (
    <BlockContext.Provider value={value}>
      {isBlock && getContent()}
      {children}
    </BlockContext.Provider>
  )
};

export const useBlock = () => {
  return useContext(BlockContext);
};

const Div = styled.div`
  .loading-indicator {
    text-align: center;
  }
  
  .block-ui {
    position: relative;
    min-height: 3em;
  }
  
  .block-ui-container {
    position: fixed;
    z-index: 1010;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 2em;
    cursor: wait;
    overflow: hidden;
  }
  
  .block-ui-container:focus {
    outline: none;
  }
  
  .block-ui-overlay {
    width: 100%;
    height: 100%;
    opacity: 0.75;
    filter: alpha(opacity=50);
    background-color: rgb(184, 184, 184);
  }
  
  .block-ui-message-container {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(-50%);
    z-index: 10001;
  }
  
  .block-ui-message {
    color: #333;
    background: none;
    z-index: 1011;
  }
  
  #indicator {
    width: 150px;
    height: 150px;
    position: absolute;
    top: calc(50% - 75px);
    left: calc(50% - 75px);
    animation: spin 1s linear infinite;
  }
  
  #circle {
    fill: none;
    stroke: rgba(255, 255, 255, 0.5);
    stroke-linecap: round;
    stroke-width: 4;
    animation: draw 3s ease-in-out infinite;
  }
  
  @keyframes draw {
    0% {
      stroke-dasharray: 20, 282.6;
    }
    50% {
      stroke-dasharray: 200, 282.6;
    }
    100% {
      stroke-dasharray: 20, 282.6;
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`