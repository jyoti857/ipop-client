import React, { useEffect } from "react"



// not working
export const useOutSideModalClick = (ref: any, handler: any) => {

  useEffect(() => {
    const listener = (e: React.MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e)
    };
    document.addEventListener('mousedown', () => listener);
    document.addEventListener('touchstart', () => listener);
    return () => {
      document.removeEventListener('mousedown', () => listener);
      document.removeEventListener('touchstart', () => listener);
    }

  }, [ref, handler])
}

 // useEffect(() => {
  //   console.log("ref current --->")
  //   const checkIfClickedOutside = (e: any) => {
  //     if (!ref.current || ref.current.contains(e.target)) {
  //       return;
  //     }
  //     if (isMore && ref.current && !ref.current.contains(e.target)) {
  //       console.log("ref current --->", ref.current)
  //       setIsMore(false)
  //     }
  //   }
  //   return () => {
  //     document.addEventListener('mousedown', checkIfClickedOutside);
  //     // document.removeEventListener('mousedown', checkIfClickedOutside)
  //   }
  // }, [isMore])

