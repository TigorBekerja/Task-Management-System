# Task Management System
This project is a REST API for a Task Management System. It uses the AdonisJS framework and PostgreSQL.
##  Base URL
https://task-management-system-production-cdae.up.railway.app/
---

##  Endpoints

###  Tasks
#### `POST /tasks`
Add new task. 

**Body (JSON):**
```json
{
  "title": "English Learning",
  "description": "Learn for english in duolingo",
  "category": "School",
  "priority": "low"
  "deadline": "2025-07-30",
}
```
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `title`         | string | Task title.                        | Mandatory     |
| `description` | string | Task description.     | Optional     |
| `category` | string | Task category.     | Mandatory     |
| `priority` | string | Task priority.     | Mandatory, only one of these that are accepted => low, medium, high     |
| `deadline` | date | Task deadline.     | Mandatory, YYYY-MM-DD     |

**Response (JSON):**
```json
[
    {
        "id": 1,
        "title": "English Learning",
        "description": "Learn for english in duolingo",
        "category": "School",
        "priority": "low",
        "deadline": "2025-07-30T00:00:00.000+00:00",
        "createdAt": "2025-07-28T04:18:42.625+00:00",
        "updatedAt": "2025-07-28T04:18:42.625+00:00"
    }
]
```


#### `GET /tasks`
Show all tasks in database.

**Response (JSON):**
```json
[
    {
        "id": 1,
        "title": "English Learning",
        "description": "Learn for english in duolingo",
        "category": "School",
        "priority": "low",
        "deadline": "2025-07-30T00:00:00.000+00:00",
        "createdAt": "2025-07-28T04:18:42.625+00:00",
        "updatedAt": "2025-07-28T04:18:42.625+00:00"
    },
    {
          "id": 2,
          "title": "Task-1753683388615",
          "description": "Test for Task-1753683388615",
          "category": "home",
          "priority": "medium",
          "deadline": "2025-08-06T00:00:00.000+00:00",
          "createdAt": "2025-07-28T06:16:29.078+00:00",
          "updatedAt": "2025-07-28T06:16:29.078+00:00"
      }
]
```

#### Filtering and Sorting (Optional)
This endpoint supports filtering and sorting using query parameters.

**Filter (Optional)**

| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `category`         | string | Filter by task category	.                        | -     |
| `priority` | string | Filter by task priority.     | low, medium, or high     |
| `deadline_from` | date | Tasks with deadline after this date.     | YYYY-MM-DD     |
| `deadline_to` | date | Tasks with deadline before this date.     | YYYY-MM-DD     |

**Sort (Optional)**

Use sort to choose which field sort by
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `priority` | string | Task priority.     | low, medium, or high     | 
| `deadline` | date | Task deadline.     | YYYY-MM-DD     |
| `createdAt` | date | The first time task is created.     | YYYY-MM-DD     |

**Order (Optional)**

Use order to choose sorting order
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `asc` | string | Tasks will be sorted by ascending.     | default other than priority   |
| `desc` | string | Tasks will be sorted by descending.     | default on priority     |


Example
``` Example
GET /tasks?priority=high&deadline_to=2025-12-31&sort=createdAt&order=asc
```

#### `GET /tasks/:id`
Show task based on id.

**Response (JSON):**
```json
{
    "id": 1,
    "title": "Task-1753676317097",
    "description": "Test for Task-1753676317097",
    "category": "home",
    "priority": "low",
    "deadline": "2025-08-05T00:00:00.000+00:00",
    "createdAt": "2025-07-28T04:18:42.625+00:00",
    "updatedAt": "2025-07-28T04:18:42.625+00:00"
}
```

#### `PUT /tasks/:id`
Edit task based on id.

**Body (JSON):**
```json
{
  "title": "Bahasa Indonesia Learning",
  "description": "Learn for bahasa indonesia in duolingo",
  "category": "School",
  "priority": "medium"
  "deadline": "2025-07-31",
}
```

**Response (JSON):**
```json
{
    "id": 1,
    "title": "Bahasa Indonesia Learning",
    "description": "Learn for bahasa indonesia in duolingo",
    "category": "School",
    "priority": "medium",
    "deadline": "2025-07-31T00:00:00.000+00:00",
    "createdAt": "2025-07-28T04:18:42.625+00:00",
    "updatedAt": "2025-07-28T06:21:55.992+00:00"
}
```

#### `DELETE /tasks/:id`
Delete task based on id. 


##  Error Handling
All endpoints may return error responses with the following structure:
```json
{
  "message": "Description of the error"
}
```

### 400 Bad Request
Occurs when the request body or query parameters are invalid.

```json
{
    "message": "invalid input",
    "errors": [
        {
            "message": "priority must be one of low,medium,high",
            "rule": "enum",
            "field": "priority",
            "meta": {
                "choices": [
                    "low",
                    "medium",
                    "high"
                ]
            }
        }
    ]
}
```

### 404 Not Found
Occurs when a requested task is not found by ID.
```json
{
    "message": "Task not found"
}
```

### 500 Internal Server Error
Occurs when an unexpected error happens on the server.
```json
{
    "message": "select * from \"tasks\" where \"id\" = $1 limit $2 - invalid input syntax for type integer: \"aaa\""
}
```
