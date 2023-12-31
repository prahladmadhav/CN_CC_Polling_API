## Posting API

This project is an open API that allows users to create questions with options and add votes to those options. No user authentication is required, making it an entirely open application. The API provides various features to create, view, and manage questions and options.

## Postman Collection

To interact with the API, you can use the provided Postman Collection file. The routes and their details are stored in a file called "Polling API.postman_collection.json." This file can be opened and imported into the Postman Application to access all the API endpoints conveniently.

### Installation and Usage

1. Download and install the Postman Application from the official website.
2. Import the "Polling API.postman_collection.json" file into Postman:
   - Click on the "Import" button in the top left corner of the Postman window.
   - Choose the "File" option and select the "Polling API.postman_collection.json" file from your local system.
   - The collection will be imported into Postman, and you will see all the available routes and requests.

### API Endpoints

The API provides the following routes for interaction:

1. **View All Questions**
   - Method: GET
   - URL: `http://localhost:8000/questions/`

2. **View a Question**
   - Method: GET
   - URL: `http://localhost:8000/questions/{{question_id}}`

3. **Create Question**
   - Method: POST
   - URL: `http://localhost:8000/questions/create`
   - Body: x-www-form-urlencoded
     - Key: `title`
     - Value: `Where is the Artic?`

4. **Create Option**
   - Method: POST
   - URL: `http://localhost:8000/questions/{{question_id}}/options/create`
   - Body: x-www-form-urlencoded
     - Key: `text`
     - Value: `North`
     - Key: `votes`
     - Value: `1`

5. **Delete Question**
   - Method: DELETE
   - URL: `http://localhost:8000/questions/{{question_id}}/delete`

6. **View All Options**
   - Method: GET
   - URL: `http://localhost:8000/options/`

7. **View an Option**
   - Method: GET
   - URL: `http://localhost:8000/options/{{option_id}}`

8. **Increment an Option's Votes**
   - Method: POST
   - URL: `http://localhost:8000/options/{{option_id}}/add_vote`

9. **Delete an Option**
   - Method: DELETE
   - URL: `http://localhost:8000/options/{{option_id}}/delete`

Please note that the `question_id` and `option_id` are dynamic values that need to be replaced with the actual IDs of the questions and options you want to interact with.

Feel free to explore the Posting API using the Postman Application and use the provided endpoints to manage questions and options efficiently. If you encounter any issues or have further questions, refer to the API documentation or contact the development team. Happy coding!