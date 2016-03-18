# bkboard

A Buildkite build report dashboard in terminal.

<img width="890" alt="bkboard" src="https://cloud.githubusercontent.com/assets/1183541/13878389/1cb3792c-ed65-11e5-9e8f-b3c69a70f78c.png">


### Usage

```sh
$ npm install bkboard -g
```

Please make sure you get Buildkite api_token from https://buildkite.com/user/api-access-tokens and set it to git config with Git, or you can pass it to `process.env.BUILDKITE_API_KEY`.

### Exampe

```sh
$ bkboard --from='2016-03-13T00:00:00Z' --to='2016-03-16T00:00:00Z' --org='$ORG' --pipeline='$PIPELINE'
```

### License

MIT
