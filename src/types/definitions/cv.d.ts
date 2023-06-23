interface Cv {
  name: string,
  profession: string,
  img: string,
  introduction: string,
  profile: Profile,
  main: Main
}

interface LocaleSettings {
  locales: Intl.LocalesArgument,
  present: string
}

interface Period {
  mainTitle : string,
  subTitle : string,
  startDate : Date,
  endDate? : Date,
  formatOptions? : Intl.DateTimeFormatOptions,
  toPresent? : boolean
}

interface LongPeriod extends Period {
  summary: string,
  details: string[]
}
