# Books-api
## Running Locally
### Prerequisities
-   **NodeJS**: v12.20.1 or higher
-   **MongoDB**: v4.2.1 or higher

### Using manual download ZIP
1.  Download repository
2.  Uncompress to your desired directory

### Move to root directory and Install dependency

```sh
$ npm install
```

### Run seeder

```sh
$ npm run build && npm run seeder
```


### To start the server execute below command.
```sh
$  npm run start
```
```
Connected to MongoDB
Listening to port 1338
Press CTRL + C to stop the process.
```

**Note:**  Your app should now be running on [localhost:1338](http://localhost:1338/).
### REST API testing in Swagger!
You can test all rest APIs with swagger [localhost:1338/docs](http://localhost:1338/v1/docs) url.
All the books api are only available for logged in users. please use  below credentials
```
User 1
email: gautam@gmail.com
password: Admin@123
User 2
email: pankti@gmail.com
password: Admin@456
```
### Step 1: Execute login api.
![image of step 1.1](https://alexa-attendance-python.s3.amazonaws.com/step-1.1.png)
![image of step 1.2](https://alexa-attendance-python.s3.amazonaws.com/step-1.2.png)
### Step 2: set access token
![image of step 2.1](https://alexa-attendance-python.s3.amazonaws.com/step-2.1.png)
![image of step 2.2](https://alexa-attendance-python.s3.amazonaws.com/step-2.2.png)
### Step 3: Get all books.
![image of step 3](https://alexa-attendance-python.s3.amazonaws.com/step-3.png)
