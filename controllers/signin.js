const handleSignin = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  
  if(!email || !password) {
    return res.status(400).json({"message" : "Incorrect form submission"})
  }

  db.select('email', 'hash').from('login').where('email', '=', email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if ( isValid ) {
      db.select('*').from('users').where('email', '=', data[0].email)
      .then(user => {
        res.status(200).json(user[0])
      })
      .catch(err => res.status(400).json(err))
    } else {
      res.status(400).json('Wrong Credentials')
    }
  })
  .catch(err => res.status(400).json("Wrong Credentials"))
}

module.exports = {
  handleSignin
}