# Refactoring Javascript by Evan Burchard

# Run
`npm run test [name of file]` // cards.js



# Notes

# How to start refactoring?
**TESTS**
  - Getting the right outputs for given inputs. This means writing tests first, and not worrying about performance until the tests are written.
  - Tests are the key factor which allows for refactoring

The EVAN principle (lol)
  Extract functions and modules to simplify interfaces
  Verify code behavior through tests
  Avoid impure functions when possible
  Name variables and functions well

# Writing tests
Three steps to a test
  1. The setup
  2. The assertion
  3. The teardown

Test Driven Development
  - Red Green Refactor

How it is done
  - Write tests for confidence
  - Write characterization tests for untested code
    - (i.e. `returns two items`)
  - Write regression tests for bugs

  REFACTOR, and small commits

# The Slow Test
Debugging and Regression tests, page 79

A tests that is run ever so often. For example, `randomDeckOfCards` . Shouldn’t be run every time but needs to be run ever so often.









































