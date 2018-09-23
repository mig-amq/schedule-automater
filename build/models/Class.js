import config from '../../config'
import cuid from 'cuid'
import TimeSlot from './TimeSlot'

const collegeMaps = {
  A: "CLA",
  C: "COB",
  K: "SOE/LIACOM/COB",
  N: "COS",
  E: "COE",
  L: "CED",
  V: "SOE",
  S: "CCS",
  X: "STC",
}

export default class Class {

  /**
   * @param {Object} props
   * @param {Number} props.number
   * @param {String} props.code
   * @param {String} props.section
   * @param {TimeSlot} props.timeslot
   * @param {Number} props.enr
   * @param {Number} props.cap
   * @memberof Class
   */
  constructor (props) {
    this.props = props
    this.props.uid = cuid()

    if (this.props.section)
      this.props.college = collegeMaps[this.props.section.charAt(0)]

  }

  inspect () {
    config.LOG.scs(this.toString())
    console.dir(this.props)
  }

  toString () {
    return "Class@" + this.props.uid
  }
}