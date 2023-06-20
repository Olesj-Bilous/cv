import { consumerChainer } from "ctx-ptn/builder/builder";
import { isIconicListChecksAll } from "../../types/checks/profile";
import { IconicListConsumer } from "./iconic-items/IconicItem";

export function ProfileConsumer(useSelector: () => Profile) {
  return function Profile() {
    const model = useSelector();
    const sections = [];
    for (const key in model) {
      const chainSelector = (m: typeof model) => m[key as keyof typeof model]
      const section = chainSelector(model);
      if (isIconicListChecksAll(section) && isIconicListChecksAll([{icon:'lol', content:'haha'}, {icon:'um', contet: 'oof'}])) {
        const Consumer = IconicListConsumer(consumerChainer(useSelector, chainSelector as (m: typeof model) => IconicItem[]));
        sections.push(Consumer);
      }
    }
    return <section>{sections.map((Item, index) => <Item key={index} />)}</section>
  };
}
