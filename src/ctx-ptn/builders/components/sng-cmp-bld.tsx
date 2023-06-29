import { NullableProps } from "ctx-ptn/utils/derived-types";
import { FreeComponentBuilder } from "./cmp-bld";
import { PropertyBuilders, StaticMixedComponentBuilder } from "./stc-mxd-cmp-bld";

interface ISingularBuilders<THeader, TBody, TFooter> {
  headerBuilder: FreeComponentBuilder<THeader>,
  bodyBuilder: FreeComponentBuilder<TBody>,
  footerBuilder: FreeComponentBuilder<TFooter>
}

export abstract class SingularComponentBuilder<THeader, TBody, TFooter>
  extends StaticMixedComponentBuilder<
    ISingularModel<THeader, TBody, TFooter>,
    ISingularBuilders<THeader, TBody, TFooter>
  > {
  protected builders: NullableProps<ISingularBuilders<THeader, TBody, TFooter>> = {
    headerBuilder: null,
    bodyBuilder: null,
    footerBuilder: null
  }
  protected modelBuilderMap: PropertyBuilders<ISingularModel<THeader, TBody, TFooter>, ISingularBuilders<THeader, TBody, TFooter>> = {
    header: b => b.headerBuilder,
    body: b => b.bodyBuilder,
    footer: b => b.footerBuilder
  };
}

export abstract class HeadedComponentBuilder<THeader, TBody> extends SingularComponentBuilder<THeader, TBody, undefined> { }

export abstract class DefaultHeadedComponentBuilder<TBody> extends HeadedComponentBuilder<DefaultHeader, TBody> {}
