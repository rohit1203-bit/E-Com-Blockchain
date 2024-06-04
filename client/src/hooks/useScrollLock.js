import React from "react";

export const useScrollLock = () => {
  const lockScroll = React.useCallback(() => {
    const body = document.body;
    body.style.overflowY = 'hidden'
    // body.style.paddingRight = '17px'
  }, [])

  const unlockScroll = React.useCallback(() => {
    const body = document.body;
    body.style.scrollSnapType = 'y proximity'
    body.style.overflowY = 'scroll';
    body.style.paddingRight = '0px'
  }, []);

  return {
    lockScroll,
    unlockScroll
  };
}