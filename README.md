# Jobs

API CURLS:

1. Post the Job:

  curl --location 'localhost:3000/api/v1/jobs' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Software Engineer",
  "description": "Full-stack developer position for a growing tech company.",
  "location": "San Francisco, CA",
  "deadline": 1719791999, 
  "user_posted": "614f1c8a8f26e9237d8c535a", 
  "posted_at": 1714392700000 
}
'

2. Get jobs group by posted date in  3 categories 3, 14, and 21 days past:

  curl --location 'localhost:3000/api/v1/jobs'

3. Get job by id:

     curl --location 'localhost:3000/api/v1/jobs/663037a24756acb98f8f1129'

4. Soft delete job:

     curl --location --request PUT 'localhost:3000/api/v1/jobs/delete/663037a24756acb98f8f1129'

5. Add interest by users in job post:

     curl --location 'localhost:3000/api/v1/jobs/add/interest' \
--header 'Content-Type: application/json' \
--data '{
    "jobId": "663037a24756acb98f8f1129",
    "userIds": [
        "614f1c8a8f26e9237d8c535a",
        "614f1c8a8f26e9237d8c535b",
        "614f1c8a8f26e9237d8c535c"
    ]
}'

6. Get interested users data:

     curl --location 'localhost:3000/api/v1/jobs/interested-users/663037a24756acb98f8f1129'
