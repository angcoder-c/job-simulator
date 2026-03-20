# Job Simulator — REST CRUD API

# API de tareas

> este laboratorio fue desarrollado con ayuda del plan de estudiante de Github Copilot, usando el mmodelo GPT 5.3-Codex

![ScreencastFrom2026-03-1920-31-52-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/de94ab99-d279-461a-a782-e3d88b962e8c)


| Campo  | Tipo    | Restricciones              |
| ------ | ------- | -------------------------- |
| id     | integer | primary key, autoincrement |
| title = campo1 | string  | requerido                  |
| content = campo2 | string  | requerido                  |
| author = campo3| string  | requerido                  |
| priority = campo4 | integer | requerido                  |
| rate = campo6 | float   | requerido                  |
| complete = campo6 | boolean | requerido                  |

## Endpoints

`GET` `/api/tasks/` 

`POST` `/api/tasks`

- body

```json
{
    "tasks" : [
        {
            // id: ,
            title:
            author
            content
            complete 
            proprity
            rate
        }
    ]
}
```


`PUT` `/api/tasks/`


`DELETE` `/api/task/{id}`


### Ejecutar 
```bash
docker compose up -d --build
```

- Frontend: `http://localhost:8080`
- API: `http://localhost:8085/api/tasks/`
