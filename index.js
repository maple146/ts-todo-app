import { createServer } from "node:http";
import * as fs from 'fs';

const hostname = "127.0.0.1";
const port = 3000;

const [,, command, arg] = process.argv;

if (command === "add") {
  addTodo(arg);
}

if (command == "show") {
  showTodos()
}

if (command == "complete") {
  completeTodo(arg)
}

export function completeTodo(number) {
    fs.readFile('output.txt', 'utf8', (err, data)  => {
    const arrayData = data.split(',')
    arrayData.splice(number, 1)
    const arrayString = arrayData.toString()

    if(err){
      console.error(err)
    } else {
      console.log("File read successfully")
    }

    fs.writeFile('output.txt', arrayString, err => {
      if (err) {
        console.error(err)
      } else {
        console.log("List updated successfully")
      }
    })
  })
}

export function showTodos() {
  fs.readFile('output.txt', 'utf8', (err, data)  => {
    if(err){
      console.error(err)
    } else {
      console.log("File read successfully")
      const arrayData = data.split(',')
      console.log(data)
      console.log(arrayData)
    }
  })
}

export function addTodo(text) {
  fs.appendFile('output.txt', text + ',', err => {
    if(err){
      console.error(err)
    } else {
      console.log("File updated successfully")
    }
  })
  console.log("Adding: ", text)
}

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
