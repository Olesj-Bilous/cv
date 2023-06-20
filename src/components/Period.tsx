import Title from "./Title";

const PeriodHeader = (props: {
  mainTitle : string,
  subTitle : string,
  startDate : Date,
  endDate? : Date,
  locales? : Intl.LocalesArgument,
  options? : Intl.DateTimeFormatOptions,
  toPresent? : string }) => {
  return (
    <div className="period">
      <Title mainTitle={props.mainTitle} subTitle={props.subTitle} />
      <div className="date">{
          `${props.startDate.toLocaleDateString(props.locales, props.options)
          }${props.endDate && ` - ${props.toPresent || props.endDate.toLocaleDateString(props.locales, props.options)}`}`
        }</div>
    </div>
  )
}

export default PeriodHeader;
