import React, { useContext, useState, useEffect, useRef } from "react"
import { NextPage } from "next"
import Router from "next/router"
import fetch from "node-fetch"
import numeral from "numeral"

import utilities from "../../utilities"

import Button from "../Elements/Button"

interface Props {
  name: string
  source: string
  url: string
  amount: number
  imageUrl: string
}

const Listing: NextPage<Props> = ({ name, source, url, amount, imageUrl }) => {
  const getData = () => {
    ;(async () => {
      const where = encodeURIComponent(
        JSON.stringify({
          Brand: "Apple",
          Model: {
            $regex: "(?i)\\iphone\\b"
          }
        })
      )
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=10&order=-Announced&where=${where}`,
        {
          headers: {
            "X-Parse-Application-Id":
              "lh5pAJNTetRNkF2sdg3iW4brYzhBbYYuDtifoFOr", // This is your app's application id
            "X-Parse-REST-API-Key": "WLCVPT6BNYfJ9zodEfURvm32GWvZRZ4VJkXjYULK" // This is your app's REST API key
          }
        }
      )
      const data = await response.json() // Here you have the data that you need
      // console.log(JSON.stringify(data, null, 2))
    })()
  }

  useEffect(() => {
    // getData()
  }, [])
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <a className="block relative rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={imageUrl}
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs uppercase tracking-widest title-font mb-1">
          {/* {source} */}
          <img
            src={
              source === "ebay"
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/1024px-EBay_logo.svg.png"
                : "https://static.swappa.com/static/images/logos/swappa_large_about@2x.png"
            }
            className={`${source === "ebay" ? "w-12" : "w-24"} inline`}
          ></img>
        </h3>
        <h2 className="title-font text-lg font-medium mb-0">{name}</h2>
        <a href={url} target="_blank">
          <Button
            text={`$${numeral(amount).format("0.00")}`}
            extend="bg-blue-600 hover:bg-blue-500 text-white"
          />
        </a>
      </div>
    </div>
  )
}

export default Listing
