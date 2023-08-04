# Posting API

This project is an open API that allows users to create questions with options and add votes to those options. No user authentication is required, making it an entirely open application. The API provides various features to create, view, and manage questions and options.

## Features

- Create a question: Users can add as many questions as they want.
- Add options to a question: Users can add multiple options to a specific question.
- Add a vote to an option: Users can increment the vote count for an option of a question.
- Delete a question (Optional): Questions can be deleted, but not if one of its options has votes associated with it.
- Delete an option (Optional): Options can be deleted, but not if they have at least one vote associated with them.
- View a question with its options and votes: Users can view a specific question along with its options and the vote count for each option.

## API Endpoints

The following routes are available in the API:

1. **Create a question**:
   - `POST /questions/create`: Creates a new question. The request should include the question's title and other details.

2. **Add options to a specific question**:
   - `POST /questions/:id/options/create`: Adds options to a specific question with the given `id`. The request should include the option's text.

3. **Delete a question** (Optional):
   - `DELETE /questions/:id/delete`: Deletes the question with the given `id`. The question can only be deleted if none of its options have any votes.

4. **Delete an option** (Optional):
   - `DELETE /options/:id/delete`: Deletes the option with the given `id`. The option can only be deleted if it has no votes associated with it.

5. **Increment the count of votes for an option**:
   - `POST /options/:id/add_vote`: Increments the vote count for the option with the given `id`.

6. **View a question and its options**:
   - `GET /questions/:id`: Retrieves a specific question with its options and all the votes given to each option. The response will include a dynamic link to vote for each option.

## Response Format

The API response will provide information about the questions and their respective options as follows:

```json
{
    "id": 1,
    "title": "Who is your favorite from the Ninjas Mentors",
    "options": [
        {
            "id": 1,
            "text": "Aakash Tyagi",
            "votes": 100,
            "link_to_vote": "http://localhost:8000/options/1/add_vote"
        },
        {
            "id": 2,
            "text": "Parikh Jain",
            "votes": 101,
            "link_to_vote": "http://localhost:8000/options/2/add_vote"
        },
        {
            "id": 3,
            "text": "Ankush Singla",
            "votes": 102,
            "link_to_vote": "http://localhost:8000/options/3/add_vote"
        },
        {
            "id": 4,
            "text": "Nidhi",
            "votes": 110,
            "link_to_vote": "http://localhost:8000/options/4/add_vote"
        }
    ]
}
```

## Schema

The API does not require explicit user registration, so it will decide the schema and fields on its own based on the provided input.

Please make sure to replace the `http://localhost:8000` in the response with the actual base URL of your API server.

Enjoy using the Posting API to create, manage, and view questions with options and votes! Feel free to extend or modify the API to suit your specific needs and requirements. Happy coding!