# Running

## Docker

``` #!/bin/bash
- cd path/project
- docker build -t bitso-statisticis/backup .
- docker run -t -i \
    -e BITSO_API='https://api.bitso.com' \
    -e BACKUP_API='http://localhost:3000' \
    -e AUTHORIZATION='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' \
    bitso-statisticis/backup
```

## Development

``` #!/bin/bash
- cp .env.example .env
- python scheduler.py
```