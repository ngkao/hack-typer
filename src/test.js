lines = ["First Line", "Second Line", "Third Line"]

let acc = 0
lines.forEach((line) => {
    acc += line.length
})

console.log(acc)