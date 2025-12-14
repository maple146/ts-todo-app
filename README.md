# ts-todo-app
## **Description:**
CLI-based todo application (v1).

It allows you to create and manage a list of todo items using the command line.

All operations are persisted in the `output.json` file.

## **Functionalities:**
### **Add an item:**
`npm run add -- "Apple"`

### **Show all items:**
`npm run show`

### **Complete an item:**
```
npm run complete -- <itemIndex>
```
`<itemIndex>` is the index of the item to mark as completed.

### **Structure of the saved data:**
```
{
    "items": [
        {
            "item": "Apple",
            "completed": false
        },
        {
            "item": "Watermelon",
            "completed": true
        },
        {
            "item": "Pear",
            "completed": false
        },
        {
            "item": "Orange",
            "completed": true
        },
    ]
}
```