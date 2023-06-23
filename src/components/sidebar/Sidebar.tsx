import { ComponentBuilder } from 'ctx-ptn/builders/components/cmp-bld';
import { ProfileBuilder } from './Profile';

export default class SidebarBuilder extends ComponentBuilder<string> {
  constructor(useModelSelector?: () => string, profileBuilder?: ProfileBuilder) {
    super(useModelSelector);
    this.profileBuilder = profileBuilder ?? null;
  }

  protected profileBuilder: null | ProfileBuilder;
  setProfileBuilder(builder: ProfileBuilder) {
    const clone = this.clone()
    clone.profileBuilder = builder;
    return clone;
  }

  get Component() {
    this.checkRequired();
    const useModelSelector = this.useModelSelector!;
    const profileBuilder = this.profileBuilder!;

    return function Sidebar() {
      const model = useModelSelector();
      return (
        <header>
          <div className='img-ctn'>
            <img src={model} alt='profile-img' />
          </div>
          {profileBuilder.Component()}
        </header>
      )
    }
  }
}
