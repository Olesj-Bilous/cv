export type NullableProps<T> = { [Key in keyof T]: null | T[Key] }

export type NonNullableProps<T> = { [Key in keyof T]: Exclude<T[Key], null> }

export function isNonNullableProps<T>(model: NullableProps<T>): model is NonNullableProps<T> {
  for (const key in model) {
    if (model[key] == null) return false;
  }
  return true;
}

export type OptionalProps<TModel> = {
  [Key in keyof TModel]+?: TModel[Key]
}
