type MessageOption = {
  message: string;
};

type ErrorOption = {
  error: Error;
};

export type AssertOption = MessageOption | ErrorOption;

/**
 * Class that represents the default error if no option is provided
 * or if it is only provided the error message
 */
export class AssertFail extends Error {
  constructor(message?: string) {
    super(message);
  }
}

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
  option?: AssertOption,
): asserts value is T {
  if (option == null) {
    if (value == null) {
      throw new AssertFail();
    }
    return;
  }

  if ("message" in option) {
    if (value == null) {
      throw new AssertFail(option.message);
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
export function assertNever(value: never, option?: AssertOption): never {
  if (option == null) {
    throw new AssertFail(`Unexpected value: ${value}`);
  }

  if ("message" in option) {
    throw new AssertFail(option.message);
  }

  throw option.error;
}

/**
 * assert that a condition results true
 *
 * @param condition
 * @param option an optional message or an optional error
 * @return assert that condition is true, throw otherwise
 */
export function assert(
  condition: boolean,
  option?: AssertOption,
): asserts condition is true {
  if (!condition) {
    if (option == null) {
      throw new AssertFail();
    }

    throw "message" in option ? new AssertFail(option.message) : option.error;
  }
}
