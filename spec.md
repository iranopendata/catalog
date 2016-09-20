# IOD Dataset Spec

This spec is adapted from [Data Packages](http://specs.frictionlessdata.io/data-packages/) in TOML with some modifications. This is a draft specification. If you have comments, suggestions or modifications visit the [issue tracker](https://github.com/iranopendata/catalog/issues) or submit a pull request.

## Specification
A dataset package is encoded in a descriptor file named `datapackage.toml`

A dataset consists of:
 - Dataset metadata
 - Resource metadata 

This specification extends Data Packages to introduce multilingual fields, as well as modify the field requirements speficifally for the Iran Open Data project. 

## Dataset metadata

### name  
**REQUIRED**

- `type: alphanumeric`

A unique identifier, alphanumeric, no symbols
```
name = "writersblock"
```

### license
**REQUIRED**

- `type: string`

License of the dataset
```
license = "CC-BY-NC" 
```

### keywords
**REQUIRED**

- `type: Array of string`

An array of strings describing the themes of this dataset
```
keywords = [ "education", "books", "publication", "author"] 
```

### created_at
**OPTIONAL**

- `type: date string`

Release date of the dataset from the author
```
created_at = "2016-09-19" 
```

### updated_at
**REQUIRED**

- `type: date string`

Date the dataset was last updated, should be at least equal or greater to the date added to IOD `indexed_at`
```
updated_at = "2016-09-19"
```

### indexed_at
**REQUIRED**

- `type: date string`

Date the dataset was added to the Iran Open Data catalog
```
indexed_at = "2016-09-19"
```

### period
**REQUIRED**

- `type: Array of two numbers`

The period of time this dataset covers. If it's the same year, repeat the year twice (e.g [2016, 2016])
```
period = [1981, 2016]
```

### frequency 
**REQUIRED**

- `type: string`

How often will this dataset is updated. Values can be daily, weekly, monthly, quarterly, yearly
```
frequency = "monthly"
```

### category
**REQUIRED**

- `type: string`

Can be one of these values: 
- Population
- Natural Resources and Energy
- Employment and Household Economy
- Women
- Economic Sectors
- Banking and Finance
- Budget and Government Spending
- Housing
- Transport
- Trade
- Health Sector Performance
- Education
- Crime and Social Pathology
- Environment
- Communications

```
category= "Education" 
```

### maintainer
**REQUIRED**

- `type: string`

Organization that is updating this dataset
```
maintainer = "Small Media Foundation"
```

### author
**REQUIRED**

- `type: object`
- `author.name: string`
- `author.web: URL string`


Author of the data.
Name should be a string.
Web should be a URL pointing to the author's homepage.
```
[author]
name = "Iran Book House" 
web = "http://ketab.ir" 
```

### title
**REQUIRED**

- `type: Array of title object`

- `title.lang: string`
- `title.text: string`
An array of titles. The language and translated text should be specified. The lang can be "en" or "fa".
```
[[title]]
lang = "en" 
text = "Dataset of books from Iran Book House" 

[[title]]
lang = "fa"
text = "Dataset of books from Iran Book House"
```

### description
**REQUIRED**

- `type: Array of description object`

- `description.lang: string`
- `description.text: string`

An array of descriptions. The language and translated text should be specified. The lang can be "en" or "fa".
```
[[description]]
lang = "fa"
text = "Over 880,000 books extracted from the Iran Book House website. The Iran Book House maintains a database of all the published books that get sent to the National Library."

[[description]]
lang = "en"
text = "Over 880,000 books extracted from the Iran Book House website. The Iran Book House maintains a database of all the published books that get sent to the National Library."

```

## Resource metadata
Resources are an array of resource objects. Each resource object has the following keys:

### url
**REQUIRED**

- `type: URL string`

URL pointing to clean resource data (such as a processed CSV)
```
url = "http://example.com/csv" 
```

### code
**OPTIONAL**

- `type: URL string`

URL pointing to code that processed the raw data into clean data to produce this resource.
```
code = "http://github.com/examplerepo"
```

### title
**REQUIRED**

- `type: Array of title object`

- `title.lang: string`
- `title.text: string`

An array of titles. The language and translated text should be specified. The lang can be "en" or "fa".
```
[[resources.title]]
lang = "en"  
text = "Database"

[[resources.title]]
lang = "fa"
text = "Database"
```

### description
**OPTIONAL**

- `type: Array of description object`

- `description.lang: string`
- `description.text: string`

An array of descriptions for further description of the resource or the process. The language and translated text should be specified. The lang can be "en" or "fa".
```
[[description]]
lang = "fa"
text = "CSV extracted from the Iran Book House search and index."

[[description]]
lang = "en"
text = "CSV extracted from the Iran Book House search and index."

```

### sources
**REQUIRED**

- `type: Array of source object`
- `source.name: string`
- `source.web: URL string`

The sources field is an array of objects, each source having a name and website. The web key points to the original raw data source.

```
[[resources.sources]]
name = "Iran Book House Search" 
web = "http://ketab.ir/modules.php?name=News&op=infobooksearch" 
```

### schema
**REQUIRED**

- `type: object`
- `schema.format: string`
- `schema.fields: Array of field objects`
- `schema.fields.name: string`
- `schema.fields.type: string`

The schema is an object that has a format.
If the format is CSV, it should have a key named fields.
`fields` is an array of field objects each having a name and type.
```
[resources.schema]
format = "csv"

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

### Example
```toml
name = "writersblock"
license = "CC-BY-NC"
keywords = [ "education", "books", "publication", "author"]
updated_at = "2016-09-19" 
indexed_at = "2016-09-19" 
period = [1981, 2016] 
frequency = "monthly"
category= "Education
maintainer = "Small Media Foundation"

[author]
name = "Iran Book 
web = "http://ketab.ir"

[[title]]
lang = "en" 
text = "Dataset of books from Iran Book House" 

[[title]]
lang = "fa"
text = "Dataset of books from Iran Book House"

[[description]]
lang = "fa"
text = "Over 880,000 books extracted from the Iran Book House website. The Iran Book House maintains a database of all the published books that get sent to the National Library."

[[description]]
lang = "en"
text = "Over 880,000 books extracted from the Iran Book House website. The Iran Book House maintains a database of all the published books that get sent to the National Library."

[[resources]]

  url = "http://example.com/csv"

  [[resources.title]]
  lang = "en" 
  text = "Database"

  [[resources.title]]
  lang = "fa"
  text = "Database"

  [[resources.sources]]
  name = "Iran Book House Search" 
  web = "http://ketab.ir/modules.php?name=News&op=infobooksearch" 

  [resources.schema]
  format = "csv"

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
