export function getOptions(data: any) {
  let options = []

  data.results.forEach((item, index) => {
    options.push({
      index,
      text: item.Brand + " " + item.Model.replace("_", ""),
      value: item.objectId
    })
  })

  return options
}

export function getSmartphones(data: any) {
  let options = []

  try {
    data.forEach((item, index) => {
      let model = item.DeviceName.replace(item.Brand + " ", "")
      if (item.technology.includes("GSM")) {
        options.push({
          index,
          text: model,
          value: model
        })
      }
    })
  } catch (err) {
    return []
  }

  return options
}

export function getSmartphoneBrands(data: any) {
  let options = []

  data.results.forEach((item, index) => {
    options.push({
      index,
      text: item.Cell_Phone_Brand,
      value: item.Cell_Phone_Brand
    })
  })

  return options
}
