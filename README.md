# Video Annotate over Bucket and save to Firestore

A cloud function template to annotate uploaded videos to your bucket and save the results to firestore.

## Consumed Cloud Services

Videos uploaded on your bucket ([Cloud Video AI](https://cloud.google.com/storage/)) where Cloud Function will be triggered to
annotate them via [Cloud Video AI](https://cloud.google.com/video-intelligence/) and payload will be pushed to a [Firestore collection](https://firebase.google.com/docs/firestore).

## Setting up

- Get a service account key
- Create a bucket
- Create a Firestore collection
- Create a cloud function
- Apply your function to your bucket
