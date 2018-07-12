# Running

## Docker

``` #!/bin/bash
- cd path/project
- docker build -t bitso-statisticis/api .
- docker run -p 3000:3000 -d bitso-statisticis/api
```

Go to http://localhost:3000

## Development

``` #!/bin/bash
- npm install && npm run serve
```