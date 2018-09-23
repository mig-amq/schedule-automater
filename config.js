import chalk from 'chalk'

export default {
  LOG: {
    err: (s) => console.log(chalk.red(s)),
    scs: (s) => console.log(chalk.green(s)),
    inf: (s) => console.log(chalk.blue(s)),
    warn: (s) => console.log(chalk.yellow(s)),
  },

  SERVER: {
    port: process.env.PORT || 3000,
  },

  DB: {
    url: "/db.sqlite3",
  },

  SESSION: {
    secret: 'schedule_automator',
    resave: false,
    saveUninitialized: true,
  },

  COOKIE: {
    maxAge: 362.25 * 24 * 3600, // 1 year
  },

  BODYPARSER: {
    extended: false,
  },

  DLSU_SITE: {
    url: "http://enroll.dlsu.edu.ph/dlsu/view_actual_count",
    field_names: {
      course_code: "p_course_code",
      open_sec: "p_open",
      closed_sec: "p_closed",
    },
  },

  EXPRESS: {
    views: "/public/views/",
    routes: "/build/controller/"
  }
}