import React from "react"
import { FaUsers, FaArrowRight, FaLocationArrow } from "react-icons/fa"

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
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <a href="#" className="inline-flex gap-2 items-center text-sm font-bold text-center text-black rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 outline-none hover:scale-110 transition-all duration-300">
            Go
            <FaArrowRight />
        </a>
        <div className="flex-1"></div>
      </div>
    </div>
  </div>
  )
}