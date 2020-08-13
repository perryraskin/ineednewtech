import React, { useContext, useState, useEffect, useRef } from "react"
import { NextPage } from "next"
import Router from "next/router"
import fetch from "node-fetch"
import Skeleton from "react-loading-skeleton"

import SelectMenu from "../Elements/SelectMenu"
import SmartphoneModelAutofill from "../Elements/SmartphoneAutofill"
import Button from "../Elements/Button"

import {
  getOptions,
  getSmartphones,
  getSmartphoneBrands
} from "../../services/transform"
import { token } from "../../services/fonoapi"

interface Props {}

const Questions: NextPage<Props> = ({}) => {
  const [chosenSmartphoneBrand, setChosenSmartphoneBrand] = useState({
    index: 0,
    text: "",
    value: ""
  })
  const [chosenSmartphoneModel, setChosenSmartphoneModel] = useState({
    index: 0,
    text: "",
    value: ""
  })
  const [chosenReason, setChosenReason] = useState({
    index: 0,
    text: "",
    value: ""
  })
  const [chosenCondition, setChosenCondition] = useState({
    index: 1,
    text: "Yes",
    value: "Yes"
  })
  const [chosenCarrier, setChosenCarrier] = useState({
    index: 0,
    text: "",
    value: ""
  })

  const [smartphoneBrands, setSmartphoneBrands] = useState([])
  const [smartphones, setSmartphones] = useState([])

  const getBrands = async () => {
    const response = await fetch(
      "https://parseapi.back4app.com/classes/Cellphonedataset_Cell_Phone_Models_By_Brand?limit=9999999",
      {
        headers: {
          "X-Parse-Application-Id": "lh5pAJNTetRNkF2sdg3iW4brYzhBbYYuDtifoFOr", // This is your app's application id
          "X-Parse-REST-API-Key": "WLCVPT6BNYfJ9zodEfURvm32GWvZRZ4VJkXjYULK" // This is your app's REST API key
        }
      }
    )
    const data = await response.json()
    const newData = getSmartphoneBrands(data)
    setSmartphoneBrands(newData)
    setChosenSmartphoneBrand(newData[5])
    getSmartphoneModels()
  }

  const getSmartphoneModels = () => {
    setSmartphones([])
    const brand =
      chosenSmartphoneBrand.value === "" ? "Apple" : chosenSmartphoneBrand.value
    ;(async () => {
      const response = await fetch(
        `https://fonoapi.freshpixl.com/v1/getlatest?token=${token}&brand=${brand}`
      )
      const data = await response.json()
      const newData = getSmartphones(data)
      setSmartphones(newData)
      // console.log("models:", newData)
      newData.length > 0 ? setChosenSmartphoneModel(newData[0]) : null
    })()
  }

  useEffect(() => {
    getBrands()
  }, [])

  useEffect(() => {
    // console.log(chosenSmartphoneBrand)
    getSmartphoneModels()
  }, [chosenSmartphoneBrand])

  const reasons = [
    {
      index: 0,
      value: "performance",
      text: "Software performance issues"
    },
    {
      index: 1,
      value: "battery",
      text: "Battery issues"
    },
    {
      index: 2,
      value: "damage",
      text: "Device has damage"
    },
    {
      index: 3,
      value: "new",
      text: "Gotta get the new one"
    },
    {
      index: 4,
      value: "camera",
      text: "Need a better camera"
    }
  ]

  const yesOrNo = [
    {
      index: 0,
      value: "No",
      text: "No"
    },
    {
      index: 1,
      value: "Yes",
      text: "Yes"
    }
  ]

  const carriers = [
    {
      index: 0,
      value: "Unlocked",
      text: "Unlocked"
    },
    {
      index: 1,
      value: "Verizon",
      text: "Verizon"
    },
    {
      index: 2,
      value: "AT&T",
      text: "AT&T"
    },
    {
      index: 3,
      value: "T-Mobile",
      text: "T-Mobile"
    },
    {
      index: 4,
      value: "Sprint",
      text: "Sprint"
    }
  ]

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          {smartphoneBrands.length > 0 ? (
            <SelectMenu
              label="Your current device's brand:"
              options={smartphoneBrands}
              defaultValue={smartphoneBrands[5]}
              chosenItem={chosenSmartphoneBrand}
              setChosenItem={setChosenSmartphoneBrand}
            />
          ) : (
            <Skeleton />
          )}
          {smartphones.length > 0 ? (
            <>
              <SelectMenu
                label="Your current device's model:"
                options={smartphones}
                defaultValue={smartphones[0]}
                chosenItem={chosenSmartphoneModel}
                setChosenItem={setChosenSmartphoneModel}
              />
              <SelectMenu
                label="Carrier preference (or requirement)?"
                options={carriers}
                defaultValue={carriers[0]}
                chosenItem={chosenCarrier}
                setChosenItem={setChosenCarrier}
              />
              <SelectMenu
                label="Why do you want a new device?"
                options={reasons}
                defaultValue={reasons[0]}
                chosenItem={chosenReason}
                setChosenItem={setChosenReason}
              />
              <SelectMenu
                label="Are you open to buying a used device for cheaper options?"
                options={yesOrNo}
                defaultValue={yesOrNo[1]}
                chosenItem={chosenCondition}
                setChosenItem={setChosenCondition}
              />
            </>
          ) : null}
          {/* <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              start your 14-day free trial
            </a>
          </p> */}
        </div>
        <form className="mt-8 hidden" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>
            <div className="-mt-px">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm leading-5 text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm leading-5">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Questions
