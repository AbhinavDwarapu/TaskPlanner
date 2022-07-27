
# TaskPlanner

A simple timer page which provides a minimal interface to start and stop a timer to work, a timer for break and add tasks to do. 

Currently deployed [here](https://taskplanning.netlify.app/).

## How to Use TaskPlanner

Press the play/pause button to play and pause the timer. The timer and break buttons at the top switch from the two modes (a 45 minute timer and a 25 minute timer). The red reset button stops the timer and resets the time.

Adding a task is as simple as clicking "Create New Task" and filling in the form. Once created, a task can be set as complete by pressing the checkmark button or can be deleted with the trashcan button. 

## How to Run

Ensure you have the latest [NodeJS](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed.

Download the project and cd into it. Then run

```bash
pnpm dev
```
or without pnpm,
```bash
npm run dev
```

which will run the development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the timer.


## Future Goals
- A draggable ui library to move tasks around
- Adding dynamic colours (changing background colours as timer drops, task colours when complete, etc.)
- Saving tasks and time to local storage
- Using the Notion API to store and view tasks 
- Settings panel to change colour scheme, timer values, etc.
- A Home page!
