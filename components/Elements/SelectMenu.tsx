import { NextPage } from "next"
import React, { useContext, useState, useEffect, useRef } from "react"

import Transition from "../Transition"

interface Props {
  label: any
  options: Array<Option>
  defaultValue?: Option
  styles?: string
  chosenItem: any
  setChosenItem: any
}

interface Option {
  index: number
  imageUrl?: string
  value: string
  text: string
}

const SelectMenu: NextPage<Props> = ({
  label,
  options,
  defaultValue = options[0],
  styles,
  chosenItem,
  setChosenItem
}) => {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const node = useRef(null)

  useEffect(() => {
    setChosenItem(defaultValue)
  }, [])

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  const handleClickMenuItem = (option: Option) => {
    setIsMenuOpen(false)
    setChosenItem(option)
  }

  return (
    <div className={`space-y-1 mb-6 ${styles}`}>
      <label
        id="listbox-label"
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <span
          className={`inline-block rounded-md shadow-sm w-full ${
            chosenItem.text.length < 15
              ? "md:w-1/2"
              : chosenItem.text.length < 5
              ? "md:w-1/4"
              : ""
          }`}
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="flex items-center space-x-3">
              {chosenItem.imageUrl ? (
                <img
                  src={chosenItem.imageUrl}
                  alt=""
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
              ) : null}
              <span className="block truncate">{chosenItem.text}</span>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </span>
        <Transition
          show={isMenuOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          appear={true}
        >
          <div
            className="mt-1 w-full rounded-md bg-white shadow-lg z-40"
            ref={node}
          >
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 z-40"
            >
              {/*
    Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

    Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
  */}
              {options.map((option, index) => {
                return (
                  <li
                    key={index}
                    id="listbox-item-0"
                    role="option"
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9
                    hover:text-white hover:bg-indigo-600"
                    onClick={() => handleClickMenuItem(option)}
                  >
                    <div className="flex items-center space-x-3">
                      {option.imageUrl ? (
                        <img
                          src={option.imageUrl}
                          alt=""
                          className="flex-shrink-0 h-6 w-6 rounded-full"
                        />
                      ) : null}
                      {/* Selected: "font-semibold", Not Selected: "font-normal" */}
                      <span
                        className={`${
                          chosenItem === option
                            ? "font-semibold"
                            : "font-normal"
                        } block truncate`}
                      >
                        {option.text}
                      </span>
                    </div>
                    {/*
      Checkmark, only display for selected option.

      Highlighted: "text-white", Not Highlighted: "text-indigo-600"
    */}
                    {chosenItem.value === option.value ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default SelectMenu
