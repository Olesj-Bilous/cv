interface CvDocument {
  cv: Cv,
  localeSettings: LocaleSettings
}

interface LocaleSettings {
  locales: Intl.LocalesArgument,
  present: string
}
