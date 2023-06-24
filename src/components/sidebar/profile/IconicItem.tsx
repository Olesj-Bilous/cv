import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";
import { selectorChainer } from "ctx-ptn/builders/context-builder";
import { isEmailAddress, isPhoneNumber, isUrl } from "utils/check-string";

const icons = {
  'map-marker': icon({ name: 'map-marker' }),
  'envelope': icon({name:'envelope'}),
  'phone': icon({ name: 'phone' }),
  'github': icon({ name: 'github', style: 'brands' })
}

export class IconicListBuilder extends ListComponentBuilder<IconicItem> { }

export class IconicItemBuilder extends ComponentBuilder<IconicItem> {
  get Component() {
    if (!this.hasRequired) throw ComponentBuilder.missingRequiredError;
    const selector = this.useModelSelector!;

    return function IconicItem() {
      const model = selector();
      let content;
      if (isUrl(model.content)) {
        content = <a href={`//${model.content}`}>{model.content}</a>
      } else if (isEmailAddress(model.content)) {
        content = <a href={`$mailto:{model.content}`}>{model.content}</a>
      } else if (isPhoneNumber(model.content)) {
        content = <a href={`tel:${model.content}`}>{model.content}</a>
      } else {
        content = model.content;
      }
      return (
        <div className="iconic">
          <div className="icon-ctn">
            <FontAwesomeIcon icon={icons[model.icon as keyof typeof icons]} />
          </div>
          <div className="content">
            {content}
          </div>
        </div>
      );
    }
  }
}
