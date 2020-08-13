import React from "react"
import { NextPage } from "next"
import Router from "next/router"
import withLayout from "../../hocs/withLayout"
import utilities from "../../utilities"

import Section from "../Layout/Section"
import Button from "../Elements/Button"
import Questions from "../Forms/Questions"
import TopListings from "./TopListings"
import Results from "./Results"

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <Section>
      <div className="text-center">
        <h1>You need new tech. Let's find you the right thing.</h1>
        <div>
          <Button
            text="Smart Device"
            extend="bg-blue-600 hover:bg-blue-500 text-white"
          />
          <Button
            text="Computer"
            extend="bg-gray-600 hover:bg-blue-600 text-white"
          />
        </div>
        <Questions />
        <a
          href="https://github.com/perryraskin/nextjs-tailwindcss-starter"
          target="_blank"
        ></a>
        <Results />
        <TopListings />
      </div>
    </Section>
  )
}

export default withLayout(Home)
