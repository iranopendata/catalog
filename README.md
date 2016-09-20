This repository contains the Iran Open Data catalog metadata, as well as metadata specification and validation. 

## Specification
The specification document is outlined in `spec.md`. Metadata added to the repository in the form of Pull requests will be validated against this specification

## Spec tests
The specification has its own tests to verify certain claims. To run the specification tests, `cd` to the validator directory and then:

```
npm install
npm run test
```

## Adding a dataset
Adding a dataset on Github can be done through the [Github UI](https://help.github.com/articles/creating-new-files/). Make sure to create a new branch so that contributors can review the proposed change.

### Metadata
Add a dataset to the `/datasets` directory according to spec.md. Each dataset should have a unique identifier with respect to the other datasets.
