

export abstract class ComponentBuilder<TModel> {
  constructor(useModelSelector?: () => TModel) {
    this.useModelSelector = useModelSelector ?? null;
  }

  clone() : typeof this {
    const proto = Object.getPrototypeOf(this);
    const obj = Object.create(proto);
    return Object.assign(obj, this);
  }

  protected useModelSelector: null | (() => TModel) = null;

  addModelSelector(selector: () => TModel) {
    const clone = this.clone();
    clone.useModelSelector = selector;
    return clone;
  }

  protected static missingRequiredError = new Error('All required selectors and builders must be provided to the ComponentBuilder.');

  get hasRequired() {
    return this.useModelSelector != null;
  }

  checkRequired() {
    if (!this.hasRequired) throw ComponentBuilder.missingRequiredError;
  }

  abstract get Component(): () => JSX.Element;
}
