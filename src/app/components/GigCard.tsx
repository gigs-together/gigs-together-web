import React from "react"
import { FaUsers, FaArrowRight } from "react-icons/fa"

type CardProps = {
  cover: string,
  title: string,
  people: number,
}

export function Card({ cover, title, people }: CardProps) {

return (
  <div className="flex flex-col bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img className="rounded-lg aspect-[5/3] object-cover" src={cover} alt="" />
    </a>
    <div className="p-2">
      <div className="flex flex-row gap-4 items-center">
        <a href="#">
          <span className="mb-2 tracking-tight dark:text-white font-bold">{title}</span>
        </a>
        <div className="flex-1"></div>
        <p className="text-sm flex flex-row items-center gap-1"><FaUsers />{people}</p>
      </div>
      <div className="flex flex-row gap-2 items-center text-gray-500">
        Berlin, Germany
      </div>
    </div>
  </div>
  )
}