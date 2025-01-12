import React from 'react'

type Props = {
    size: number | string, 
    op: number
}

export default function BlurCircle({ size, op }: Props) {
  return (
    <div className={`bg-light-green rounded-full blur-[8rem] animate-breathing absolute top-[12rem]`} style={{width: size, height: size, opacity: op}}></div>
  )
}