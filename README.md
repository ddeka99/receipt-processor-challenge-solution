# Intro

This repository serves as a solution to Fetch Rewards coding challenge as described [here](https://github.com/ddeka99/receipt-processor-challenge-solution)

To run said solution, you need to have Docker installed.

To build the image
```
docker build -t receipt-processor .
```
To run the image and start the container
```
docker run -p 3000:3000 receipt-processor
```

# About the challenge

We need to set up a simple web service that exposes two endpoints: one for processing receipts (`/receipts/process`) and another for retrieving points awarded to a receipt (`/receipts/{id}/points`). The points rewarded for a receipt are determined based on rules described in the challenge link.

# Important Points

- Solution uses Express as the web framework.
- Solution assumes that receipt data is provided as a JSON object in the request body and is always valid.
- Receipt data doesn't persist after exiting the application.
- Tests can be performed using Postman.
- Example receipts are provided in the `examples` folder.