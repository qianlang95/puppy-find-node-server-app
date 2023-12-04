const Hello = (app) => {

  app.get('/', (req, res) => {
    res.send('Welcome to puppy find')
  })
}
export default Hello;