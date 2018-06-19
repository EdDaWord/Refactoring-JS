# Refactoring Javascript by Evan Burchard

## Run
`npm run test [name of file]` // cards.js

# Notes

**TESTS**
  - Getting the right outputs for given inputs. This means writing tests first, and not worrying about performance until the tests are written.
  - Tests are the key factor which allows for refactoring

The EVAN principle (lol)
  Extract functions and modules to simplify interfaces
  Verify code behavior through tests
  Avoid impure functions when possible
  Name variables and functions well

## Writing tests
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

## The Slow Test
Debugging and Regression tests, page 79

A tests that is run ever so often. For example, `randomDeckOfCards` . Shouldn’t be run every time but needs to be run ever so often.

## Signs a function should be refactored
  - Too bulky? Split it up
    - Aim for that middle ground of more then 3 and less then 25 lines per function.
  - Too many paths and hard to follow? Split it up
  - Too little and only called once? Inline it
  - Keep side effects to a minimum or nonexistent

### OOP things in JS
  - Classes (sweet sweet sugar)
  - Chaining functions `[].doSomething().doSomethingElse()`
  - Private variables and classes

## Working example of JS refactoring
 Naive Bayes Classifier (NBC)

The code `naiveBayesClassifier.js` is a simple algorithm that is feed in pairs of data `[ difficulty, chords ] ` and after classifying a bunch of training data, it can now make predictions on how difficult a bunch of chords are based on the percentage of chords that belong to the each category in the training data. It’s a calculator that tells you if your chords are hard to play.

























