# Task Management System
Project ini merupakan project REST API untuk Task Management System. Project dikerjakan dengan menggunakan framework AdonisJS dan PostgreSQL.  
## 🧭 Base URL
https://task-management-system-production-cdae.up.railway.app/
---

## 📚 Endpoints

### ✅ Tasks
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
