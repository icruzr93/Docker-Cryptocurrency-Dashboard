# Running

## Docker

``` #!/bin/bash
- cd path/project
- docker build -t bitso-statisticis/api .
- docker run -t -i \
    -e NODE_ENV='https://api.bitso.com' \
    -e JWT_SECRET='http://localhost:3000' \
    -e DATABASE_URL='postgres://postgres:1234@localhost:5432/postgres' \
    -p 3000:3000 \
    bitso-statisticis/api
```

Go to http://localhost:3000

## Development

``` #!/bin/bash
- npm run serve
```