const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id: id
  }).then(user => {
    user.length ? res.status(200).json(user[0]) : res.status(400).json('User Not Found')
  }).catch(err => console.log("Error getting user"));
}

module.exports = {
  handleProfile
}