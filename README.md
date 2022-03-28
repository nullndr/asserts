# TypeScript asserts

An npm package with useful assert functions.

List of functions:

- `assertNotNull`

  ```typescript
  import { assertNotNull } from "asserts";
  ```

  Assert that a value is not null

  ```typescript
  const user: User | null = await fetchUser(endpoint);

  assertNotNull(user);

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
    }

    default: {
      assertNever(aStrangeConstant);
    }
  }
  ```
