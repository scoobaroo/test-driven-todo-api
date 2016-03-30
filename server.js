
// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  var sTask = req.query.q;
  console.log(req.query);
  var sTodos=[];
  for(var i=0; i<todos.length; i++){
    if(todos[i].task==sTask){
      sTodos.push(todos[i]);
    }
  }
  res.json({todos:sTodos});
});

app.get('/api/todos', function index(req, res) {
  res.json(200, {todos:todos});
});

app.post('/api/todos', function create(req, res) {
    var newTask = req.body.task;
    var newDescription = req.body.description;
    var newTodo = {_id: todos.length+1, task: newTask, description: newDescription};
    todos.push(newTodo);
    res.status(200).json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  var id = parseInt(req.params.id);
  var theOne;
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id===id){
      theOne=todos[i];
    }
  }
  res.status(200).json(theOne);
});

app.put('/api/todos/:id', function update(req, res) {
  var id = parseInt(req.params.id);
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id===id){
      todos[i].task = req.body.task;
      todos[i].description = req.body.description;
      res.status(200).json(todos[i]);
    }
  }
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = parseInt(req.params.id);
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id===id){
      todos.splice(i,1);
    }
  }
  res.status(200).json(todos);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
