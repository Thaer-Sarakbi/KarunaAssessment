export type User = {
    creationDate: string,
    id: string,
    email: string,
    password: string
}

export type Task = {
    id: string,
    creationDate: {
      seconds: number
    }, 
    checked: true,
    taskText: string
}