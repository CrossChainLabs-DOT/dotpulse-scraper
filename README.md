# DotPulse Scraper

### Run Unit Tests

```
    npm i
    npm run test
```

### Run DotPulse Scraper and DotPulse API

```
    git clone https://github.com/CrossChainLabs-DOT/dotpulse-scraper.git
    git clone https://github.com/CrossChainLabs-DOT/dotpulse-api.git
    
    cd dotpulse-api  
    npm i 
    cd ../dotpulse-scraper
    npm i 

    cp .env.sample .env
    # update GITHUB_TOKEN=
    
    docker-compose build
    docker-compose up
```

### Test DotPulse API

```
    curl localhost:3000/statistics
    curl localhost:3000/top_contributors
    curl localhost:3000/commits
    curl localhost:3000/active_contributors
    curl localhost:3000/recent_commits
    curl localhost:3000/repositories
```
