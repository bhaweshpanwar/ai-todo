//With GPT

/*import { db } from './db/index.js';
import { todosTable } from './db/schema.js';
import { ilike } from 'drizzle-orm';
import OpenAI from 'openai';
import readLineSync from 'readline-sync';

const client = new OpenAI();

// Database Tools
async function getAllTodos() {
  return await db.select().from(todosTable);
}

async function createTodo(todo) {
  const [result] = await db
    .insert(todosTable)
    .values({ todo })
    .returning({ id: todosTable.id });
  return result.id;
}

async function searchTodo(search) {
  return await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, `%${search}%`));
}

async function deleteTodoById(id) {
  await db.delete().from(todosTable).where(todosTable.id.eq(id));
}

const tools = { getAllTodos, createTodo, deleteTodoById, searchTodo };

const SYSTEM_PROMPT = `
You are a AI To-Do List Assistant with START,PLAN, ACTION, OBSERVATION and OUTPUT State.
Wait for the user prompt and first PLAN using availabe tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START prompt and observations.

You can manage task by adding,viewing,updating and deleting them.
You must strictly follow the JSON output format

## Capabilities:
- Add new tasks
- View all tasks
- Search for tasks
- Delete tasks by ID

## Todo DB Schema:
- id: Integer (Primary Key)
- todo: String (Task Description)
- created_at: DateTime
- updated_at: DateTime

## Available Tools:
- getAllTodos(): Fetch all stored tasks.
- createTodo(todo: String): Add a new task, returns its ID.
- deleteTodoById(id: String): Remove a task by ID.
- searchTodo(query: String): Find tasks matching a search term.

## Example Interactions:

### Example 1: Adding a Task
START
{ "type": "user", "user": "Add a task for shopping groceries." }
{ "type": "plan", "plan": "I will add 'Shopping for groceries' as a new task." }
{ "type": "action", "function": "createTodo", "input": "Shopping for groceries" }
{ "type": "observation", "observation": "5" }
{ "type": "output", "output": "Your task has been added successfully with ID 5." }

### Example 2: Searching for a Task
START
{ "type": "user", "user": "Find my grocery shopping task." }
{ "type": "plan", "plan": "I will search for 'grocery shopping' in the database." }
{ "type": "action", "function": "searchTodo", "input": "grocery shopping" }
{ "type": "observation", "observation": "[{'id': 5, 'todo': 'Shopping for groceries'}]" }
{ "type": "output", "output": "Here are your matching tasks: 1. Shopping for groceries (ID: 5)." }

### Example 3: Deleting a Task
START
{ "type": "user", "user": "Delete my task with ID 5." }
{ "type": "plan", "plan": "I will delete the task with ID 5." }
{ "type": "action", "function": "deleteTodoById", "input": "5" }
{ "type": "observation", "observation": "Deleted successfully" }
{ "type": "output", "output": "Your task with ID 5 has been deleted." }

If you don't understand a request, ask the user for clarification.
`;

const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

while (true) {
  const query = readLineSync.question('>> ');
  const userMessage = { type: 'user', user: query };
  messages.push({ role: 'user', content: JSON.stringify(userMessage) });

  while (true) {
    const chat = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      response_format: { type: 'json_object' },
    });

    const result = chat.choices[0].message.content;
    const action = JSON.parse(result);
    messages.push({ role: 'assistant', content: result });

    if (action.type === 'output') {
      console.log(`🤖: ${action.output}`);
      break;
    } else if (action.type === 'action') {
      const fn = tools[action.function];
      if (!fn) {
        console.error(`Invalid function: ${action.function}`);
        break;
      }

      const observation = await fn(action.input);
      const observationMessage = { type: 'observation', observation };
      messages.push({
        role: 'assistant',
        content: JSON.stringify(observationMessage),
      });
    }
  }
}*/

/*const SYSTEM_PROMPT = `
You are a AI To-Do List Assistant with START,PLAN, ACTION, OBSERVATION and OUTPUT State.
Wait for the user prompt and first PLAN using availabe tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START prompt and observations.

You can manage task by adding,viewing,updating and deleting them.
You must strictly follow the JSON output format

Todo DB Schema:
id: Int and Primary Key
todo:String
created_at:Date Time
updated_at:Date Time

Available Tools:
-getAllTodos():Returns all the Todos from Database
-createTodo(todo:String): Creates a new Todo in the DB and takes todo as a string and returns the ID of created todo
-deleteTodoById(id:String):Deleted the todo by ID given in the DB
-searchTodo(query:string): Searches for all todos matching the query string using ilike in DB

Example:
START
{ "type":"user","user":"Add a task for shopping groceries."}
{ "type":"plan","plan":"I will try to get more context on what user needs to shop."}
{ "type":"output","output":"Can you tell me what all items you want to shop for?."}
{ "type":"user","user":"I want to shop for milk, kurkure, lays and choco."}
{ "type":"plan","plan":"I will use createTodo to create a new Todo in DB."}
{ "type":"action","function":"createTodo", "input":"Shopping for milk, kurkure, lays and choco."}
{ "type":"observation","observation":"2"}
{ "type":"output","output":"Your Todo has been added successfully."}

`;*/

import { db } from './db/index.js';
import { todosTable } from './db/schema.js';
import { ilike } from 'drizzle-orm';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import readlineSync from 'readline-sync';

async function getAllTodos() {
  return await db.select().from(todosTable);
}

async function createTodo(todo) {
  const [result] = await db
    .insert(todosTable)
    .values({ todo })
    .returning({ id: todosTable.id });
  return result.id;
}

async function searchTodo(search) {
  return await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, `%${search}%`));
}

async function deleteTodoById(id) {
  await db.delete().from(todosTable).where(todosTable.id.eq(id));
}

const tools = { getAllTodos, createTodo, deleteTodoById, searchTodo };

const SYSTEM_PROMPT = `
You are a AI To-Do List Assistant with START,PLAN, ACTION, OBSERVATION and OUTPUT State.
Wait for the user prompt and first PLAN using availabe tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action.
Once you get the observations, Return the AI response based on START prompt and observations.

You can manage task by adding,viewing,updating and deleting them.
You must strictly follow the JSON output format

Todo DB Schema:
id: Int and Primary Key
todo:String
created_at:Date Time
updated_at:Date Time

Available Tools:
-getAllTodos():Returns all the Todos from Database
-createTodo(todo:String): Creates a new Todo in the DB and takes todo as a string and returns the ID of created todo
-deleteTodoById(id:String):Deleted the todo by ID given in the DB
-searchTodo(query:string): Searches for all todos matching the query string using ilike in DB

Example:
START
{ "type":"user","user":"Add a task for shopping groceries."}
{ "type":"plan","plan":"I will try to get more context on what user needs to shop."}
{ "type":"output","output":"Can you tell me what all items you want to shop for?."}
{ "type":"user","user":"I want to shop for milk, kurkure, lays and choco."}
{ "type":"plan","plan":"I will use createTodo to create a new Todo in DB."}
{ "type":"action","function":"createTodo", "input":"Shopping for milk, kurkure, lays and choco."}
{ "type":"observation","observation":"2"}
{ "type":"output","output":"Your Todo has been added successfully."}
`;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: SYSTEM_PROMPT,
});

const chat = model.startChat({
  history: [],
  generationConfig: {
    temperature: 0.7,
    top_p: 1,
    maxOutputTokens: 100,
  },
});

while (true) {
  const query = readlineSync.question('>> ');
  const userMessage = JSON.stringify({ type: 'user', user: query });

  try {
    const result = await chat.sendMessage(userMessage);
    let responseText = result.response.candidates[0].content.parts[0].text;

    responseText = responseText.replace(/```json|```/g, '').trim();
    const jsonMatches = responseText.match(/\{[^]*?\}/g);
    if (!jsonMatches) {
      console.error('No valid JSON found:', responseText);
      continue;
    }

    for (const jsonStr of jsonMatches) {
      let action;
      try {
        action = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        console.error('Failed JSON:', jsonStr);
        continue;
      }

      if (action.type === 'output') {
        console.log(`🤖: ${action.output}`);
      } else if (action.type === 'action') {
        const fn = tools[action.function];
        if (!fn) {
          console.error(`Invalid function: ${action.function}`);
          continue;
        }

        let observation;
        try {
          observation = await fn(action.input);
        } catch (fnError) {
          console.error('Error executing function:', fnError);
          continue;
        }

        const observationMessage = JSON.stringify({
          type: 'observation',
          observation,
        });
        const observationResult = await chat.sendMessage(observationMessage);
        console.log(
          '🤖:',
          observationResult.response.candidates[0].content.parts[0].text
        );
      }
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    break;
  }
}
