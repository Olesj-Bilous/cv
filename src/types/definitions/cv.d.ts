interface Cv {
  name: string,
  profession: string,
  img: string,
  introduction: string,
  profile: Profile,
  main: Main
}

interface DisplayList<TItem> {
  title: string,
  items: TItem[]
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
