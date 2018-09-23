import config from '../../config'
import moment from 'moment'

const dayMap = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  H: "Thursday",
  F: "Friday",
  S:" Saturday",
}

export default class TimeSlot {
  constructor (day, time, room) {
    this.props = {
      day: null,
      start: null,
      end: null,
      professor: null,
      date: null,
      room: room,
    }

    let d = moment(day, "MMM")
    let t = [moment(time.substr(0, 4), "HH:mm"), moment(time.substr(7, 4), "HH:mm")]
    this.props.start = t[0].toDate()
    this.props.end = t[1].toDate()

    if (d.isValid()) {
      this.props.date = d.toDate()
      this.props.repeating = false
    } else {
      this.props.day = []

      day.split("").forEach((v, i, a) => {
        this.props.day.push(v)
      })

      this.props.repeating = true
    }
  }

  inspect () {
    console.log.dir(this.props)
  }
}