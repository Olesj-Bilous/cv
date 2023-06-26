import Title from "./Title";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";
import { isLongPeriod } from "types/checks/profile";

export class PeriodListBuilder extends ListComponentBuilder<Period, {}> { }

export class PeriodBuilder extends ComponentBuilder<Period, {}> {
  constructor(useModelSelector?: () => Period, localeSettingsSelector?: () => LocaleSettings) {
    super(useModelSelector);
    this.localeSettingsSelector = localeSettingsSelector ?? null;
  }

  protected localeSettingsSelector: null | (() => LocaleSettings) = null;
  setLocaleSettingsSelector(selector: () => LocaleSettings) {
    const clone = this.clone();
    clone.localeSettingsSelector = selector;
    return clone;
  }

  get hasRequired() {
    return super.hasRequired && this.localeSettingsSelector != null;
  }

  get Component() {
    this.checkRequired();
    const modelSelector = this.useModelSelector!;
    const settingsSelector = this.localeSettingsSelector!;
    
    return function PeriodHeader() {
      const model = modelSelector();
      const settings = settingsSelector();
      const end = (model.toPresent && settings.present)
        || (model.endDate && model.endDate.toLocaleDateString(settings.locales, model.formatOptions));
      return (
        <div className="period">
          <Title mainTitle={model.mainTitle} subTitle={model.subTitle} />
          <div className="date">
            {`${model.startDate.toLocaleDateString(settings.locales, model.formatOptions)}`}
            {end && ` - ${end}`}
          </div>
          {
            isLongPeriod(model) && (
              <div>
                <div>
                  {model.summary}
                </div>
                {model.details.length && (
                  <ul>
                    {
                      model.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))
                    }
                  </ul>
                )}
              </div>
            )
          }
        </div>
      )
    }
  }
}
