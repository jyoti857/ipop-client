import React from 'react'

type Props = {
  src: any;
  className: string;
  alt: string;
}

function CustomImage({ src, className, alt }: Props) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
    >
    </img>
  )
}

export default CustomImage