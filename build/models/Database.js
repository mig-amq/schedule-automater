import sqlite3 from 'sqlite3'
import config from './../../config'

class DB {
  static init() {
    this.db = new sqlite3.verbose().Database("./db.sqlite3", (err) => {
      if (err)
        config.LOG.err(err.message)

      config.LOG.scs("Connected to DB...")
    })

    this.db.serialize(() => {
      
    })

    return this
  }

  static prepare () {
    try {

    } catch (ex) {
      config.LOG.err(ex.message)
    }
  }

  static run () {
    try {

    } catch (ex) {
      config.LOG.err(ex.message)
    }
  }

  static find () {
    try {

    } catch (ex) {
      config.LOG.err(ex.message)
    }
  }

  static insert () {
    try {

    } catch (ex) {
      config.LOG.err(ex.message)
    }
  }
}