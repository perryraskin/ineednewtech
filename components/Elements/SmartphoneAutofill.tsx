import { NextPage } from "next"
import React, { useContext, useState, useEffect, useRef } from "react"
import fetch from "node-fetch"

import Transition from "../Transition"

import { getOptions, getSmartphones } from "../../services/transform"
import { token } from "../../services/fonoapi"

interface Props {
  label: any
  styles?: string
}

interface Smartphone {
  imageUrl?: string
  value: string
  text: string
}

const SmartphoneAutofill: NextPage<Props> = ({ label, styles }) => {
  const [input, setInput] = useState("")
  const [chosenItem, setChosenItem] = useState({ value: "", text: "" })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const node = useRef(null)

  const [smartphones, setSmartphones] = useState([])

  const getData = (query: string) => {
    ;(async () => {
      const response = await fetch(
        `https://fonoapi.freshpixl.com/v1/getdevice?token=${token}&device=${query}`
      )
      const data = await response.json()
      console.log(data)
      if (query.length > 0) setSmartphones(getSmartphones(data))
    })()
  }

  useEffect(() => {
    console.log(input, token)
    if (input.length > 0) setIsMenuOpen(true)
    try {
      getData(input)
    } catch (err) {
      console.log("FonoAPI:", err.message)
    }
  }, [input])

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

  const handleClickMenuItem = (option: Smartphone) => {
    setIsMenuOpen(false)
    setInput(option.text)
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
        <span className="inline-block w-full rounded-md shadow-sm">
          <input
            type="text"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            onKeyDown={e => setInput(e.currentTarget.value)}
          ></input>
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
              {smartphones.map(option => {
                return (
                  <li
                    key={option.value}
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
                      <span className={`font-normal block truncate`}>
                        {option.text}
                      </span>
                    </div>
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

export default SmartphoneAutofill
