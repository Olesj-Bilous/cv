import Title from "./Title";
import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";

export class PeriodListBuilder extends ListComponentBuilder<Period> { }

export class PeriodHeaderBuilder extends ComponentBuilder<Period> {
  constructor(useModelSelector?: () => Period, localeSettingsSelector?: () => LocaleSettings) {
    super(useModelSelector);
    this.localeSettingsSelector = localeSettingsSelector ?? null;
  }

  protected localeSettingsSelector: null | (() => LocaleSettings) = null;
  setLocaleSettingsSelector(value: () => LocaleSettings) {
    this.localeSettingsSelector = value;
    return this;
  }

  get hasRequired() {
    return super.hasRequired && this.localeSettingsSelector != null;
  }

  get Component() {
    if (!this.hasRequired) throw ComponentBuilder.missingRequiredError;
    const modelSelector = this.useModelSelector!;
    const settingsSelector = this.localeSettingsSelector!;
    
    return function PeriodHeader() {
      const model = modelSelector();
      const settings = settingsSelector();
      const end = (model.toPresent && settings.present) || (model.endDate && model.endDate.toLocaleDateString(settings.locales, model.formatOptions));
      return (
        <div className="period">
          <Title mainTitle={model.mainTitle} subTitle={model.subTitle} />
          <div className="date">
            {`${model.startDate.toLocaleDateString(settings.locales, model.formatOptions)}${end && ` - ${end}`}`}
          </div>
        </div>
      )
    }
  }
}
