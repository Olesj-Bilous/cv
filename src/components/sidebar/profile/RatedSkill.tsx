import { ComponentBuilder } from "ctx-ptn/builders/components/cmp-bld";
import { ListComponentBuilder } from "ctx-ptn/builders/components/list-cmp-bld";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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
        const star = i < rating ? icon({ name: 'star', style: 'solid' }) : icon({ name: 'star', style: 'regular' });
        stars.push(<FontAwesomeIcon icon={star} />)
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
