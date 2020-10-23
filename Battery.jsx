import React, { useEffect, useState } from "react"

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

// export default class Battery extends React.Component {
export default function Battery() {
  const [charging, setCharging] = useState(false)
  const [level, setLevel] = useState(0)

  function handleChange(event) {
    const { level, charging } = event.target // target is a BatteryManager object

    setCharging(charging)
    setLevel(level)
  }

  useEffect(() => {
    let battery

    navigator.getBattery().then((batt) => {
      // set current charge on app load
      handleChange({
        target: batt,
      })

      battery = batt

      // https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
      batt.addEventListener("levelchange", handleChange)
      batt.addEventListener("chargingchange", handleChange)
    })

    // cleanup
    return () => {
      battery.removeEventListener("levelchange", handleChange)
      battery.removeEventListener("chargingchange", handleChange)
    }
  }, []) // only run on mount and unmount

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
