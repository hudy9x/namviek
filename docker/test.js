const loop = () => {
  console.log('log', new Date())
  setTimeout(() => {
    loop()
  }, 5000)
}

loop()
