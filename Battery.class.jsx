import React, { useState } from "react"

import { IconContext } from "react-icons"

import {
  FcChargeBattery,
  FcEmptyBattery,
  FcFullBattery,
  FcHighBattery,
  FcLowBattery,
  FcMiddleBattery,
} from "react-icons/fc"

const getIcon = (charging, level) => {
  let levelIcon
  switch (true) {
    case level === 0:
      levelIcon = <FcEmptyBattery />
      break
    case level > 0 && level <= 0.25:
      levelIcon = <FcLowBattery />
      break
    case level > 0.25 && level <= 0.5:
      levelIcon = <FcMiddleBattery />
      break
    case level > 0.5 && level < 1:
      levelIcon = <FcHighBattery />
      break
    case level === 1:
      levelIcon = <FcFullBattery />
      break
    default:
      levelIcon = <FcEmptyBattery />
  }

  return (
    <IconContext.Provider value={{ size: "40rem" }}>
      <div style={{ position: "absolute" }}>{charging && <FcChargeBattery />}</div>
      <div style={{ opacity: charging ? "0.5" : "1" }}>{levelIcon}</div>
    </IconContext.Provider>
  )
}

export default class Battery extends React.Component {
  constructor() {
    super()
    this.state = {
      charging: false,
      level: 0,
    }
  }

  handleChange = (event) => {
    const { level, charging } = event.target // target is a BatteryManager object

    this.setState({
      charging: charging,
      level: level,
    })
  }

  // side-effect -> get battery details
  componentDidMount() {
    navigator.getBattery().then((batt) => {
      // set current charge on app load
      this.handleChange({
        target: batt,
      })

      // attach battery to "this" instance
      this.battery = batt

      // https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
      this.battery.addEventListener("levelchange", this.handleChange)
      this.battery.addEventListener("chargingchange", this.handleChange)
    })
  }

  // cleanup
  componentWillUnmount() {
    this.battery.removeEventListener("levelchange", this.handleChange)
    this.battery.removeEventListener("chargingchange", this.handleChange)
  }

  render() {
    const { charging, level } = this.state

    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getIcon(charging, level)}
        <div style={{ fontSize: "4rem", position: "absolute", bottom: "4rem" }}>
          {level * 100}%
        </div>
      </div>
    )
  }
}
