interface Cv {
    name: string,
    profession: string,
    img: string,
    introduction: string,
    profile: Profile,
    main: Main
}

interface Period {
    mainTitle : string,
    subTitle : string,
    startDate : Date,
    endDate? : Date,
    options? : Intl.DateTimeFormatOptions,
    toPresent? : boolean,
    localPresent? : string
}

interface LongPeriod extends Period {
    summary: string,
    details: string[]
}
