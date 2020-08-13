import React, { useContext, useState, useEffect, useRef } from "react"
import { NextPage } from "next"
import Router from "next/router"
import fetch from "node-fetch"
import amazonApi from "amazon-pa-api50"
import amazonConfig from "amazon-pa-api50/lib/config"
import {
  Resources,
  Condition,
  Country,
  SearchIndex
} from "amazon-pa-api50/lib/options"

const config = new amazonConfig()
// config.accessKey =
// config.secretKey =
config.partnerTag = "perryraskin01-20"

const api = new amazonApi(config)

import eBay from "ebay-node-api"
let ebay = new eBay({
  // clientID: "PerryRas-ineednew-PRD-bc8e8a00c-0496b681",
  clientID: "PerryRas-ineednew-SBX-8c8ec878c-aa459650",
  env: "SANDBOX", // optional default = 'PRODUCTION'
  headers: {
    // optional
    "X-EBAY-API-AFFILIATE-USER-ID": "1546111"
  }
})

import utilities from "../../utilities"

import Listing from "../Product/Listing"
import Button from "../Elements/Button"

interface Props {}

const TopListings: NextPage<Props> = ({}) => {
  // let resourceList = Resources.getItemInfo
  // resourceList = resourceList.concat(Resources.getImagesPrimary)

  // api
  //   .getItemById(["B079JD7F7G"], {
  //     parameters: resourceList,
  //     condition: Condition.Any
  //   })
  //   .then(response => {
  //     console.log(" ===== find by Item ids =====")
  //     console.log("data", response.data)
  //   })
  //   .catch(error => {
  //     console.log("Error: ", error)
  //   })

  // ebay.getSingleItem("153265274986").then(data => {
  //   console.log(data)
  // })

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
    })()
  }

  useEffect(() => {
    // getData()
    // eBaySearch("iphone 11")
  }, [])
  const testAmount = 799.9
  return (
    <section className="body-font">
      <h2>Popular Listings</h2>
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-wrap -m-4">
          <Listing
            name="iPhone 11 Pro"
            source="Swappa"
            url=""
            amount={testAmount}
            imageUrl="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-11-Pro/Midnight-Green/Apple-iPhone-11-Pro-Midnight-Green-frontimage.jpg"
          />
        </div>
      </div>
    </section>
  )
}

export default TopListings
