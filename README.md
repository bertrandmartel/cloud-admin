# Cloud Admin

[![Build Status](https://travis-ci.org/bertrandmartel/cloud-admin.svg?branch=master)](https://travis-ci.org/bertrandmartel/cloud-admin)
[![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE.md)

A database admin interface with dynamic model configuration supporting table relations through datatable views powered by React

### [Live Application](http://bertrandmartel.github.io/cloud-admin)

[![screen](https://user-images.githubusercontent.com/5183022/36955712-5fb43212-202a-11e8-891c-a98e6ccb88d3.png)](http://bertrandmartel.github.io/cloud-admin)

### Configuration

#### Edit mode

To match your own model, edit configuration file [config.js](./src/config.js) :

```javascript
export default

{
  showEditMode: true,
  mode: [{
    name: "demo"
  }, {
    name: "server",
    url: "http://localhost:4000/admin/headers"
  }]
}
```

This JSON configuration has the following format : 

* showEditMode [boolean] - whether to show the dropdown box with the list of mode **Required**
* mode [Array] - list of modes **Required**

The list of mode can include :

* name [String] - the mode name **Required**
* url [String] - url to fetch the model configuration file **Required except for demo mode**

#### Model endpoint

The model endpoint specified in the `url` field in the mode configuration file should return a JSON array with the following format : 

```json
[{
  "name": "users",
  "displayName": "Users",
  "fields": [{
    "accessor": "userId"
  }, {
    "accessor": "email"
  }, {
    "accessor": "createdAt",
    "filterable": false
  }, {
    "accessor": "updatedAt",
    "filterable": false
  }]
}]
```

Properties : 

* name [String] - table name **Required**
* displayName [String] - name to display on tab 
* fields [Array] - list of accessor & other table properties **Required**
  * accessor [String] - accessor name **Required**
  * aggregate [Boolean] - specify if this field should be visible on the same line as the pivoted field (works only for the 1st pivoted field)
* pivotBy [Array] - array of string with accessor name for pivoted field
* subFields [Array] - list of accessor & other table properties for sub tables only if pivotBy was specified

All properties of `fields` & `subFields` array are expanded into [react-table columns](https://github.com/react-tools/react-table#columns) (except for `aggregate` which is processed differently)

A Sample JSON configuration is available under [src/demo/template.js](./src/demo/template.js)

### Dependencies

This project is using :

* [React](https://github.com/facebook/react)
* [Material UI](https://github.com/callemall/material-ui)
* [React Table](https://react-table.js.org)

This project has been created using [create-react-app](https://github.com/facebookincubator/create-react-app)

### Docker

Modify `homepage` field from `package.json` to match the target host :

* build

```
docker build . -t cloud-admin
```

* run

```
docker run -p 5000:5000 cloud-admin
```

## License

The MIT License (MIT) Copyright (c) 2018 Bertrand Martel
