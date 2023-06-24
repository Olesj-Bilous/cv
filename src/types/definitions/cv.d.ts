interface Cv {
  img: string,
  profile: Profile,
  main: DisplayList<DisplayList<LongPeriod>>
}

interface DisplayList<TItem> {
  title: string,
  items: TItem[],
  className?: string,
  subtitle?: string,
  introduction?: string
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
