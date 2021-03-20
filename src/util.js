const _ = require("lodash")
const VAL = require("./const")

/**
 * Randomly sort the element in an array
 * @param {Array} arr An array of arbitary type of element
 */
const shuffle = (arr) => {
  var curr_index = arr.length,
    temp,
    ran_index

  while (0 !== curr_index) {
    ran_index = Math.floor(Math.random() * curr_index)
    curr_index -= 1

    temp = arr[curr_index]
    arr[curr_index] = arr[ran_index]
    arr[ran_index] = temp
  }

  return arr
}

/**
 * Process the raw lyrics to readable text
 * @param {string} lrc raw lyrics returned from the NetEase server
 */
const parse_lrc = (lrc) => {
  if (typeof lrc === "undefined") {
    return "```No lyrics available```"
  }
  let sanitized = lrc.split("\n")
  for (let i = 0; i < sanitized.length; i++) {
    let l = sanitized[i]
    try {
      if (l.length >= 0 && l[0] == "[") {
        sanitized[i] = sanitized[i].slice(sanitized[i].indexOf("]") + 1)
      }
    } catch (err) {
      console.log(err)
    }
  }

  let prased = "```"
  for (let i = 0; i < sanitized.length; i++) {
    if (prased.length < 1990) {
      prased += sanitized[i] + "\n"
    }
  }
  prased += "```"
  return prased
}

/**
 * Check if param has a value
 * @param {anything} param
 */
const exist = (param) => {
  return typeof param !== "undefined"
}

/**
 * Parse the list of album objects to readable text
 * @param {Object[]} list
 */
const parse_album_list = (list) => {
  // `1) 黑梦 (窦唯, 1994) [10 songs]`

  let msg = "```"

  for (let i = 0; i < list.length; i++) {
    let temp_date = new Date(list[i].date)
    msg += `${i + 1})    ${list[i].name} (${
      list[i].ar
    }, ${temp_date.getFullYear()})`
    msg += ` [${list[i].size} song${list[i].size > 1 ? "s" : ""}]\n`
  }

  msg += "```"

  return msg
}

/**
 * if e exists in arr, remove its first appearance
 * @param {array} arr target array
 * @param {object} e an element in the array
 */
const remove_element_from_array = (arr, e) => {
  let sanitized_arr = []
  let flag = false

  for (let i = 0; i < arr.length; i++) {
    if (_.isEqual(arr[i], e) && !flag) {
      flag = true
      continue
    }

    sanitized_arr.push(arr[i])
  }

  return sanitized_arr
}

const filter = (reaction, user) => {
  return VAL.NUM_EMOJI.includes(reaction.emoji.name)
}

const formulate_command = (command) => {
  switch (command) {
    case "p":
    case "play":
    case "playsong":
      return "play"
    case "q":
    case "queue":
      return "queue"
    case "lyric":
    case "lyrics":
      return "lyric"
    case "pa":
    case "album":
    case "playalbum":
      return "album"
    case "h":
    case "help":
      return "help"
    default:
      return command
  }
}

exports.exist = exist
exports.parse_lrc = parse_lrc
exports.shuffle = shuffle
exports.parse_album_list = parse_album_list
exports.remove_element_from_array = remove_element_from_array
exports.filter = filter
exports.formulate_command = formulate_command
