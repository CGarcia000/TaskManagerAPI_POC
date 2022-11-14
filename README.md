# POC-TypeScript

*Proof of Concept* para aprender a aplicar typescript em uma api simples de task management.

## Installing

Após fazer um clone do repositório na sua máquina, rode o seguinte comando para ter a api rodando na porta **5000** do *localhost*

    npm run start

Para rodar a API e fazer implementações usando o nodemon rode o seguinte comando:

    npm run dev

## Routes

Na API é possível criar colaboradores e atribuir tarefas a eles. A seguir foi documentado as rotas funcionais da API.

### Collaborators Routes

- (POST) Adicionar um novo colaborador à API
```
/add/collaborator

body: {
     "name": "Jonh Doe",
     "age": 32
}
```

- (GET) Retorna todos os colaboradores adicionados à API
```
/collaborator

response: [
     {
         "id": 1,
         "name": "Jonh Doe",
         "age": 32
     },
     { ... }          
 ]
```

- (GET) Retorna um colaborador identificado pelo seu id
```
/collaborator/:id

response: {
         "id": 1,
         "name": "Jonh Doe",
         "age": 32
     }
```

### Task Routes

- (POST) Adiciona uma nova task à API

```
/add/task

body: {
     "name": "Responder email",
     "description": "Responder email sobre nova feature";
     "collaboratorId": 1;
}
```


- (GET) Retorna todas as tasks da API
```
/task

response: [
     {
         "id": 1,
         "name": "Responder email",
         "description": "Responder email sobre nova feature";
         "status": false,
         "collaboratorId": 1;
     },
     { ... }          
 ]
```

- (GET) Retorna uma task identificado pelo seu id
```
/task/:id

response: {
         "id": 1,
         "name": "Responder email",
         "description": "Responder email sobre nova feature";
         "status": false,
         "collaboratorId": 1;
     }
```

- (GET) Retorna todas as tasks de um colaborador
```
/collaborator/:id/tasks

response: [
     {
         "id": 1,
         "name": "Responder email",
         "description": "Responder email sobre nova feature";
         "status": false,
         "collaboratorId": 1;
     },
     { ... }
 ]
```

- (PATCH) Altera o status de uma task como true (done) ou false (not done)

```
/task/:id/mark
```

- (DELETE) Deleta uma task identificada pelo seu id

```
/task/:id
```

- (GET) Retorna o número de tasks cadastradas na API

```
/count/task

response: {
       "count": "1"
   }
```

- (GET) Retorna o número de tasks cadastradas na API que estão com o status como **done**

```
/count/task/done

response: {
       "count": "0"
   }
```
