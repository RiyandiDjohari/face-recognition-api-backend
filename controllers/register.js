const handleRegister = (req, res, bcrypt, db) => {
  const { name, email, password } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  if(!name || !email || !password) {
    return res.status(400).json({"message" : "Incorrect form submission"})
  }

  db.transaction( trx => {
    trx.insert({
      hash: hash,
      email: email,
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        name: name,
        email: loginEmail[0].email,
        joined: new Date()
      })
      .then(user => res.status(200).json(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json("Failed to register"))
}

module.exports = {
  handleRegister
}