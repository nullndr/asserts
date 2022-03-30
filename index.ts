type MessageOption = {
  message: string;
};

type ErrorOption = {
  error: Error;
};

type Option = MessageOption | ErrorOption;

/**
 * assert that a value is not null or undefined
 *
 * ```typescript
 * const user: User | null = await fetchUser(endpoint)
 *
 * assertNotNull(user, { error: new UserNotFound(endpoint) })
 *
 * // now `user` is of type `User`
 * console.log(user)
 * ```
 *
 * @param value
 * @param option an optional message or an optional error
 * @return assert that value is T, throw if null
 */
export function assertDefined<T>(
  value: T | null | undefined,
  option?: Option
): asserts value is T {
  if (option == null) {
    if (value == null) {
      throw new Error();
    }
    return;
  }

  if ("message" in option) {
    if (value == null) {
      throw new Error(option.message);
    }
    return;
  }

  if (value == null) {
    throw option.error;
  }
}

/**
 * assert that all variants of an union have been exhausted
 *
 * @param value
 * @param option an optional message or an optional error
 * @return never return, just throw an error
 */
export function assertNever(value: never, option?: Option): never {
  if (option == null) {
    throw new Error(`Unexpected value: ${value}`);
  }

  if ("message" in option) {
    throw new Error(option.message);
  }

  throw option.error;
}
