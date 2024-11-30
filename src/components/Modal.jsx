import React from 'react'

const Modal = ({children, close}) => {
  return (
    <>
      <div onClick={close} className="fixed top-0 left-0 w-full h-screen bg-[#0005] z-10"></div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        {children}
      </div>
    </>
  );
}

export default Modal