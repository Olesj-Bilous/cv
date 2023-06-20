import { selectorChainer } from "ctx-ptn/builder/builder";
import { isEmailAddress, isPhoneNumber, isUrl } from "utils/check-string";

export function IconicListConsumer(useSelector: () => IconicItem[]) {
  return function IconicList() {
    const model = useSelector();
    return (
      <ul>
        {
          model.map((item, index) => {
            const Consumer = IconicItemConsumer(selectorChainer(useSelector, thisModel => thisModel[index]));
            return (<Consumer key={index} />);
          })
        }
      </ul>
    );
  };
}

export function IconicItemConsumer(useSelector: () => IconicItem) {
  return function IconicItem() {
    const model = useSelector();
    let content;
    if (isUrl(model.content)) {
      content = <a href={`//${model.content}`}>{model.content}</a>
    } else if (isEmailAddress(model.content)) {
      content = <a href={`$mailto:{model.content}`}>{model.content}</a>
    } else if (isPhoneNumber(model.content)) {
      content = <a href={`tel:${model.content}`}>{model.content}</a>
    } else {
      content = <>{model.content}</>
    }
    return (
      <li>
        <div className="icon-ctn">
          <span className={model.icon}></span>
        </div>
        <div className="content">
          {content}
        </div>
      </li>
    );
  }
}
