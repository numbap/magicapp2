console.log("hello")

const ff = [{id: "75765675756", name:"herb", age: 43, height: 80}, {id: "534543543", name:"paul", age: 33, height: 70}, {id: "9798978789", name:"fred", age: 28, height: 32}]


console.log(ff.reduce((a, v) => {...a, [v.id] = v)})