import React, { useContext, useState, useEffect, useRef } from "react"
import { NextPage } from "next"
import Router from "next/router"
import fetch from "node-fetch"
import Skeleton from "react-loading-skeleton"

import utilities from "../../utilities"

import Listing from "../Product/Listing"
import Button from "../Elements/Button"

interface Props {}

const Results: NextPage<Props> = ({}) => {
  const [results, setResults] = useState(null)

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

  const eBaySearch = keywords => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"

    let filters =
      "&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(1).name=MinPrice&itemFilter(1).value=100.0&itemFilter(1).paramName=Currency&itemFilter(1).paramValue=USD&itemFilter(2).name=Condition&itemFilter(2).value(0)=New&itemFilter(2).value(1)=2000&itemFilter(2).value(2)=2500&itemFilter(2).value(3)=3000"

    const queryUrl = `https://svcs.ebay.com/services/search/FindingService/v1?SERVICE-VERSION=1.0.0&REST-PAYLOAD&OPERATION-NAME=findItemsAdvanced&SECURITY-APPNAME=PerryRas-ineednew-PRD-bc8e8a00c-0496b681&RESPONSE-DATA-FORMAT=JSON&affiliate.networkId=9&affiliate.trackingId=5338033975&keywords=${keywords}&categoryId=9355&sortOrder=PricePlusShippingLowest&paginationInput.entriesPerPage=4&paginationInput.pageNumber=1&FeedbackScoreMin=1${filters}`
    ;(async () => {
      const response = await fetch(proxyUrl + queryUrl, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
      })
      const data = await response.json()
      // console.log(JSON.stringify(data, null, 2))
      console.log(data)
      setResults(data.findItemsAdvancedResponse[0].searchResult[0].item)
    })()
  }

  useEffect(() => {
    // getData()
    eBaySearch("iphone 11")
  }, [])
  return (
    <section className="body-font">
      <h2>Results</h2>
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-wrap -m-4">
          {results ? (
            results.map(result => {
              return (
                <Listing
                  key={result.itemId[0]}
                  name={result.title[0]}
                  source="ebay"
                  url={result.viewItemURL[0]}
                  amount={
                    result.sellingStatus[0].convertedCurrentPrice[0].__value__
                  }
                  imageUrl={result.galleryURL[0]}
                />
              )
            })
          ) : (
            <>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative rounded overflow-hidden h-32">
                  <Skeleton />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs uppercase tracking-widest title-font mb-1">
                    <Skeleton />
                  </h3>
                  <h2 className="title-font text-lg font-medium mb-0">
                    <Skeleton />
                  </h2>
                  <div className="text-white">
                    <Skeleton />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative rounded overflow-hidden h-32">
                  <Skeleton />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs uppercase tracking-widest title-font mb-1">
                    <Skeleton />
                  </h3>
                  <h2 className="title-font text-lg font-medium mb-0">
                    <Skeleton />
                  </h2>
                  <div className="text-white">
                    <Skeleton />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative rounded overflow-hidden h-32">
                  <Skeleton />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs uppercase tracking-widest title-font mb-1">
                    <Skeleton />
                  </h3>
                  <h2 className="title-font text-lg font-medium mb-0">
                    <Skeleton />
                  </h2>
                  <div className="text-white">
                    <Skeleton />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative rounded overflow-hidden h-32">
                  <Skeleton />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs uppercase tracking-widest title-font mb-1">
                    <Skeleton />
                  </h3>
                  <h2 className="title-font text-lg font-medium mb-0">
                    <Skeleton />
                  </h2>
                  <div className="text-white">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Results
