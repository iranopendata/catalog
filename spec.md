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
name = "writersblock" # A unique identifier
license = "CC-BY-NC" # A string describing the license
keywords = [ "education", "books", "publication", "author"] # An array of strings
updated_at = "2016-09-19" # The date this dataset was updated 
indexed_at = "2016-09-19" # The date this dataset was added to IOD
period = [1981, 2016] # The period of time this covers. If it's the same year, repeat the year twice (e.g [2016, 2016])
frequency = "monthly" # can be daily, monthly, quarterly, yearly
category= "Education" # check issues/2 for all categories
maintainer = "Small Media Foundation" # A string describing the mainterner

# The author is an object that has a name and a web (URL)
[author]
name = "Iran Book House" # Name of the author of the data
web = "http://ketab.ir" # a URL pointing to the homepage

# The title is an array of objects
# Each object has lang and text keys
[[title]]
lang = "en" 
text = "Dataset of books from Iran Book House" 

[[title]]
lang = "fa"
text = "Dataset of books from Iran Book House"

# The description is an array of objects
# Each object has lang and text keys
[[description]]
lang = "fa"
text = "Over 880,000 books extracted from the Iran Book House website. The Iran Book House maintains a database of all the published books that get sent to the National Library."

[[description]]
lang = "en"
text = "Over 880,000 books extracted from the Iran Book House website. The Iran Book House maintains a database of all the published books that get sent to the National Library."

# resources is an array of resource objects
# A resource has a url, title, sources and schema
[[resources]]

  url = "http://example.com/csv" # A URL pointing to the data

  # The title is an array of objects
  # Each object has lang and text keys
  [[resources.title]]
  lang = "en" 
  text = "Database"

  [[resources.title]]
  lang = "fa"
  text = "Database"

  # The sources is an array of objects
  # Each source object has a name and web (url)
  [[resources.sources]]
  name = "Iran Book House Search" # Name of the source data
  web = "http://ketab.ir/modules.php?name=News&op=infobooksearch" # URL pointing to the raw source

  # The schema is an object that has a format
  # If the format is CSV, it should have a key named fields
  # fields is an array of field objects each having a name and type
  [resources.schema]
  format = "csv"

      # Fields is an array of objects
      # Each field has a name and type
      [[resources.schema.fields]]
      name = "Author"
      type = "string"

      [[resources.schema.fields]]
      name = "Publisher"
      type = "string"

      [[resources.schema.fields]]
      name = "Title"
      type = "string"

      [[resources.schema.fields]]
      name = "Year"
      type = "date"
```
