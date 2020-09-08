#!/bin/bash

NAME=generateApparat
GOOGLE_COMPUTE_REGION=europe-west1
RUNTIME=nodejs12

#npm run build || exit 1

gcloud functions deploy "${NAME}" \
  --runtime ${RUNTIME} \
  --region "${GOOGLE_COMPUTE_REGION}" \
  --trigger-http \
  --allow-unauthenticated


# "https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/FUNCTION_NAME" (all verbs)