import React from "react"
import { FaUsers, FaArrowRight } from "react-icons/fa"

type CardProps = {
  cover: string,
  title: string,
  people: number,
}

export function Card({ cover, title, people }: CardProps) {

return (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={cover} alt="" />
      </a>
      <div className="p-4">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">{title}</h5>
        </a>
        <div className="flex flex-row gap-4 py-2 items-center">
          <a href="#" className="inline-flex gap-2 items-center text-sm font-bold text-center text-black rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 outline-none hover:scale-110 transition-all duration-300">
              Go
              <FaArrowRight />
          </a>
          <div className="flex-1"></div>
          <p className="text-sm text-gray-700 flex flex-row items-center gap-1"><FaUsers />{people}</p>
        </div>
    </div>
    </div>
  )
}