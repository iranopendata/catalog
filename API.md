# API

Base URL: `https://iranopendata.github.io/catalog`

## Index

ROUTE: `/index.json` 

The index route contains short information about each project added to the catalog. Each project contains a unique ID (using the `name` key) that is used to access a project's metadata.
The format is the following:

```
meta: {
  version: "draft-v1"
},
datasets: [
  {
   name: 'UNIQUE ID',
   updated_at: 'DATE THE DATASET WAS UPDATED',
   indexed_at: 'DATE THE DATASET WAS ADDED TO CATALOG'
   ...
  }
]
```

## Project data

ROUTE: `/datasets/{ID}.json`

The datasets route contains the entire metadata for each dataset. It is accessed using the "ID" tags from the index.
