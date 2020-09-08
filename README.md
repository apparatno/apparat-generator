# Apparat Generator

<img src="apparat_logo.png" alt="apparat" height="300"><br/>

## How to use

In Slack:

```
/apparat
```

## Development

* Install everything: `npm i`
* Run locally: `npm start`

## Deployment

- You must have the `gcloud` CLI tool installed
- Make sure you're logged in with your Apparat Google account:

```
gcloud auth login
gcloud auth application-default login
```

In both cases, choose your Apparat Google account when prompted.

- Make sure you have the `apparat-slack-integrations` Google Cloud project selected:

```
gcloud config set project apparat-slack-integrations
```

- Run `./deploy.sh` to deploy to Google Cloud Functions. If `deploy.sh` is not executable, run `chmod +x deploy.sh`.

- Check status and logs in the Firebase Console or Google Cloud Console for the project.
