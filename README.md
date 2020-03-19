# ig-data-count

## About

Instagram allows one to get their data downloaded. This tool, is to see the number of messages passed between people, right from that json file present in the data downloaded.

This is not intended to be a real and functional tool which has an actual use, and rather, is an experiment on async await programming in JS,and JSDoc type enforcment.

## Setup

Might need sudo to link (Hint: `nvm` users do not need sudo)

```sh
npm i
npm link
```
## Usage

### Print to console

```sh
igdc -i messages.json
```

### Create a markdown file table

```sh
igdc -i messages.json -o output.md
```


