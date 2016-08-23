# IOD Dataset Spec

This spec is adapted from [Data Packages](http://specs.frictionlessdata.io/data-packages/) in TOML with some modifications. This is a draft specification. If you have comments, suggestions or modifications visit the [issue tracker](https://github.com/iranopendata/catalog/issues) or submit a pull request.

## Specification
A dataset package is encoded in a descriptor file named `datapackage.toml`

A dataset consists of:
 - Dataset metadata
 - Resource metadata 

This specification extends Data Packages to introduce multilingual fields, as well as modify the field requirements speficifally for the Iran Open Data project. 

### Example
```
license = "PDDL-1.0"
keywords = [ "GDP", "World", "Gross Domestic Product", "Time series"]
created_at = "2016-07-27"
updated_at = "2016-07-27"
period = [1993, 2005]
frequency = "monthly"
author = "Organization Name"
homepage = "http://example.com/dataset/"

name = "gdp"

[[title]]
lang = "en"
title = "Country, Regional and World GDP (Gross Domestic Product)"

[[title]]
lang = "fa"
title = "Country, Regional and World GDP (Gross Domestic Product)"

[[description]]
lang = "fa"
description = "Country, regional and world GDP in current US Dollars ($). Regional means collections of countries e.g. Europe & Central Asia. Data is sourced from the World Bank and turned into a standard normalized CSV."

[[description]]
lang = "en"
description = "Country, regional and world GDP in current US Dollars ($). Regional means collections of countries e.g. Europe & Central Asia. Data is sourced from the World Bank and turned into a standard normalized CSV."


[[resources]]

  url = "https://raw.github.com/datasets/gdp/master/data/gdp.csv"
  name = "gdp"

  [[resources.title]]
  lang = "en"
  title = "Country, Regional and World GDP (Gross Domestic Product)"

  [[resources.title]]
  lang = "fa"
  title = "Country, Regional and World GDP (Gross Domestic Product)"

  [resources.schema]
  format = "csv"

      [[resources.schema.fields]]
      name = "Country Name"
      type = "string"

      [[resources.schema.fields]]
      name = "Country Code"
      type = "string"

      [[resources.schema.fields]]
      name = "Year"
      type = "date"

      [[resources.schema.fields]]
      name = "Value"
      type = "number"

[[resources]]
  name = "gdp-market-prices"
  url = "http://api.worldbank.org/v2/en/indicator/NY.GDP.MKTP.CD?downloadformat=xml"

  [[resources.title]]
  lang = "fa"
  text = "GDP at market prices (current US$)"

  [[resources.title]] 
  lang = "en"
  text = "GDP at market prices (current US$)"

  [resources.schema]
  format = "XML"
```
