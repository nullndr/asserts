# TypeScript asserts

An npm package with useful assert functions.

## Functions

- `assert`

  ```typescript
  import { assert } from "asserts";
  ```

  Assert that a condition is true

  ```typescript
  assert(user.id === 123);
  ```

- `assertDefined`

  ```typescript
  import { assertDefined } from "asserts";
  ```

  Assert that a value is not null or undefined

  ```typescript
  const user: User | null = await fetchUser(endpoint);

  assertDefined(user);

  // now we are sure that `user` is of User type
  const userId = user.id;
  ```

- `assertNever`

  ```typescript
  import { assertNever } from "asserts";
  ```

  Ensure that all union variants are checked

  ```typescript
  type UnionA = {
    message: "unionA";
  };

  type UnionB = {
    message: "unionB";
  };

  type UnionC = UnionA | UnionB;

  const aStrangeConstant: UnionC = aStrangeFunction();

  switch (aStrangeConstant.message) {
    case "unionA": {
      console.log("I found UnionA");
      break;
    }

    case "unionB": {
      console.log("I found UnionB");
      break;
    }

    default: {
      assertNever(aStrangeConstant);
    }
  }
  ```

## Errors

All functions inside this package raise an `AssertFail` object once an assertion fails.
