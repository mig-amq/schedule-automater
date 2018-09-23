import {
  Router
} from 'express'

import config from '../../config'
import cheerio from 'cheerio'
import request from 'request'
import {Class, TimeSlot} from '../models'

const Schedule = Router()

Schedule.get('/', (req, res) => {
  try {
    getSchedule(req.query);
  } catch (ex) {
    config.LOG.err(ex.message)
    console.log(ex.response)
  }

  res.render('index.hbs')
})

Schedule.delete('/', (req, res) => {
  res.render('index.hbs')
})

Schedule.put('/', (req, res) => {
  res.render('index.hbs')
})

Schedule.post('/', (req, res) => {
  res.render('index.hbs')
})

export default Schedule

function getSchedule(query) {
  let data = {}
  data[config.DLSU_SITE.field_names.course_code] = query.cc;
  data[config.DLSU_SITE.field_names.open_sec] = query.op;
  data[config.DLSU_SITE.field_names.closed_sec] = query.cl;

  request
    .post({url: config.DLSU_SITE.url, form: data}, (err, res, body) => {
      if (err) 
        throw new Error({message: "An error occured", response: res})
      else
        return scrape (body)
    })
}

function scrape (response) {
  const $ = cheerio.load(response)
  const resultTable = $(config.DLSU_SITE.table_loc) // get table of schedules
  var classes = []

  let cleaned = resultTable
    .html() // convert to html
    .replace(/\s+/mi, " ") // clean up html
    .match(/(?:<tr( 1="")?>)((.|\n)+?)(?:<\/tr>)/gi) // split table by tr 
    // Note: there's a random 1="" in the row for profs lol wtf

  cleaned.shift() // remove the header row
  cleaned.forEach((v, i, a) => {
    // loop through class rows

    /**
     * Capture the number of data in a row
     * 9 - the row contains a class
     * 3 - the row contains another schedule for the class above it
     * 1 - the row contains the professor info
     */
    let cols = v
    .match(/<td.+?>((?!&#xA0)(.|\n))+?<\/td>/gi)

    cols = cols.map(s => {
      s = s.substr(s.lastIndexOf("\">") + 2, s.indexOf("</") - s.lastIndexOf("\">") - 2).replace("\n", "")
      return s
    })

    /**
     * 0 [Class Number]
     * 1 [Class Code]
     * 2 [Section]
     * 3 [Day] <- Other Schedule starts here (0)
     * 4 [Time]
     * 5 [Room]
     * 6 [Enrl Cap]
     * 7 [Enrolled]
     * 8 [Remarks]
     */
    var props;
    switch (cols.length) {
      case 9: // class
        props = {
          number: parseInt(cols[0]),
          code: cols[1],
          section: cols[2],
          timeslot: [new TimeSlot(cols[3], cols[4], cols[5])],
          enr: cols[6],
          cap: cols[7],
          remarks: cols[8],
        }

        classes.push(new Class(props))
        break
      case 3: // other schedule
        let t = new TimeSlot(cols[0], cols[1], cols[2])

        classes[classes.length - 1].props.timeslot.push(t)
        break
      case 1: // professor
        default:
          classes[classes.length - 1]
            .props.timeslot[classes[classes.length - 1].props.timeslot.length - 1]
            .props.professor = cols[0]
    }
  })

  console.dir(classes[0].props.timeslot)
} 