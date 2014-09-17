futurists =
  sculptor: "Umberto Boccioni"
  painter:  "Vladimir Burliuk"
  poet:
    name:   "F.T. Marinetti"
    address: [
      "Via Roma 42R"
      "Bellagio, Italy 22021"
    ]

{poet: {name, address: [street, city]}, sculptor, painter} = futurists

console.log name
console.log street
console.log city
console.log sculptor
console.log painter

{poet: {name, address}, sculptor, painter} = futurists
console.log address
