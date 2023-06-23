import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";

export class RatedSkillListBuilder extends ListComponentBuilder<RatedSkill> {}

export class RatedSkillBuilder extends ComponentBuilder<RatedSkill> {
  get Component() {
    this.checkRequired();
    const useSelector = this.useModelSelector!;

    const scale = 5;

    return function RatedSkill() {
      const model = useSelector();
      const rating = Math.ceil((model.rating * scale) / model.scale);

      const stars = []
      for (let i = 0; i < scale; i++) {
        stars.push(<span className={`fa fa-star ${i < rating && 'solid'}`}></span>)
      }

      return (
        <div className="rated-skill">
          <div className="skill">
            {model.skill}
          </div>
          <div className="rating">
            {stars}
          </div>
        </div>
      )
    }
  }
}
