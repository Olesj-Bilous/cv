import { ComponentBuilder } from 'ctx-ptn/builders/components/cmp-bld';
import { ReactNode } from 'react';

export default class SidebarBuilder extends ComponentBuilder<string, {children?: ReactNode}> {
  get Component() {
    this.checkRequired();
    const useModelSelector = this.useModelSelector!;

    return function Sidebar(props: { children?: ReactNode }) {
      const model = useModelSelector();
      return (
        <header>
          <div className='img-ctn'>
            <img src={model} alt='profile-img' />
          </div>
          {props.children}
        </header>
      )
    }
  }
}
