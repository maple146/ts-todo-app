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
    fs.readFile('output.json', 'utf8', (err, data)  => {
    if (err) {
      console.error(err)
      return
    }
    
    const parsedData = JSON.parse(data)

    if(parsedData.items[number].completed === false) {
      parsedData.items[number].completed = true
      console.log("Item completed")
    } else {
      console.error("Item is already completed")
    }

    fs.writeFile('output.json', JSON.stringify(parsedData), err => {
      if (err) {
        console.error(err)
        return
      } else {
        console.log("List updated successfully")
      }
    })
  })
}

export function showTodos() {
  fs.readFile('output.json', 'utf8', (err, data)  => {
    if(err){
      console.error(err)
    } else {
      console.log("File read successfully")
      const parseData = JSON.parse(data)
      console.log(parseData.items)
    }
  })
}

export function addTodo(text) {
  const convertedText = {"item": text, "completed": false}
  
  fs.readFile('output.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err)
    } else {
      // Check if json file is empty
      if(data === ""){
        console.log("JSON file is empty")
        const baseStructure = {"items": []}

        // Add base structure
        fs.writeFile('output.json', JSON.stringify(baseStructure), err => {
          if (err) {
            console.error(err)
            return
          } else {
            console.log("Base structure added successfully")
          }
        })
      } else {
        const parsedData = JSON.parse(data)

        // Check if the key items exists in the json object
        if ("items" in parsedData) {
          // Add item
          parsedData.items.push(convertedText)
          fs.writeFile('output.json', JSON.stringify(parsedData), err => {
            if (err) {
              console.error(err)
              return
            } else {
              console.log("New item added successfully")
            }
          })
        } else {
          console.error("Key items doesnt exists in the file")
        }
      }
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
