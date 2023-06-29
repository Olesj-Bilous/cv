interface Cv {
  img: string,
  profile: Profile,
  main: DefaultDisplayList<DefaultDisplayList<DefaultPeriodDisplayList>>
}

interface ISingularModel<THeader, TBody, TFooter> {
  body: TBody,
  header?: THeader,
  footer?: TFooter
}

interface IHeadedModel<THeader, TBody> extends ISingularModel<THeader, TBody, undefined> { }

interface DefaultHeader {
  title: string,
  subtitle?: string,
  introduction?: string
}

interface Period {
  startDate : Date,
  endDate? : Date,
  formatOptions? : Intl.DateTimeFormatOptions,
  toPresent? : boolean
}

interface PeriodHeader<THeader> extends IHeadedModel<THeader, Period> { }

interface DefaultPeriodHeader extends PeriodHeader<DefaultHeader> { }

interface HeadedDisplayList<THeader, TItem> extends IHeadedModel<THeader, TItem[]> {}

interface DefaultDisplayList<TItem> extends HeadedDisplayList<DefaultHeader, TItem> { }

interface DefaultPeriodDisplayList extends HeadedDisplayList<DefaultPeriodHeader, string> {}
