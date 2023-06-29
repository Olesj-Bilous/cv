import Title from "./DefaultHeader";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { DefaultDisplayListBuilder, ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";
import { HeadedComponentBuilder } from "ctx-ptn/builders/components/sng-cmp-bld";

export class SectionListBuilder extends ListComponentBuilder<DefaultDisplayList<DefaultPeriodDisplayList>> {}

export class PeriodDetailsDisplayListBuilder extends DefaultDisplayListBuilder<DefaultPeriodDisplayList> { }

export class PeriodDetailsListBuilder extends ListComponentBuilder<DefaultPeriodDisplayList> {}

export class PeriodDetailsBuilder extends HeadedComponentBuilder<DefaultPeriodHeader, string[]> {}

export class PeriodHeaderDisplayListBuilder extends DefaultDisplayListBuilder<DefaultPeriodHeader> {}

export class PeriodHeaderListBuilder extends ListComponentBuilder<DefaultPeriodHeader> { }

export class StringListBuilder extends ListComponentBuilder<string> { }

export class StringComponentBuilder extends ComponentBuilder<string, {}> {
  get Component() {
    if (this.useModelSelector == null) throw ComponentBuilder.missingRequiredError;
    const selector = this.useModelSelector;

    return function StringComponent() {
      return <>{selector()}</>
    }
  }
}

export class PeriodHeaderBuilder extends HeadedComponentBuilder<DefaultHeader, Period> {}

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
          <div className="date">
            {`${model.startDate.toLocaleDateString(settings.locales, model.formatOptions)}`}
            {end && ` - ${end}`}
          </div>
      )
    }
  }
}
