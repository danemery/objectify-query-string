# objectify-query-string

A JavaScript utility that converts query strings into objects. It's primarily meant for the browser, as Node's querystring.parse() method performs essentially the same operation. That being said, if you want to use it with Node, go for it!

## Installation

### Browser

```
<script src="https://s3-us-west-2.amazonaws.com/objectify-query-string/objectifyQueryString.js"></script>
```

### Node.js

```
npm install objectify-query-string
```

Then, in your code:

```
const objectifier = require('objectify-query-string');
```

## Usage

**objectify-query-string will:**  

Convert correctly formatted key/value pairs

```
objectifier.objectify('?name=dan&city=seattle&neighborhood=beacon&height=tall');
// {city: 'seattle', height: 'tall', name: 'dan', neighborhood: 'beacon'}
```

Convert key/value pairs with missing values

```
objectifier.objectify('?name=&city=seattle&neighborhood=&height=tall');
// {city: 'seattle', height: 'tall', name: '', neighborhood: ''}
```

**NOT** convert key/value pairs with missing keys

```
objectifier.objectify('?name=dan&=seattle&neighborhood=beacon&=tall');
// {name: 'dan', neighborhood: 'beacon'}
```