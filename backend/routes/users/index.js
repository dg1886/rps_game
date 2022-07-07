const Users = require('../../models/users');

const crypto = require('crypto');

const hash = (password) => {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    const salt = crypto.randomBytes(16).toString("hex")

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString('hex'))
    });
  })
}

const verify = (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":")
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'))
    });
  })
}

module.exports = (_, express) => {

  const router = express.Router();

  router.route('/registration')
    .post(async (req, res) => {
      const hashedPassword = await hash(req.body.password)
      try {

        await Users.create({
          username: req.body.username,
          password: hashedPassword,
          score: {
            multiWins: 0,
            mulitLose: 0,
            mulitiDraws: 0,
            singleWins: 0,
            singleLose: 0,
            singleDraws: 0
          }
        });
        res.json('User added successfull!');

      } catch (error) {
        res.status(400).json('Error: ' + error);
      }
    })
  
  router.route('/login').post(async (req, res) => {
    try {

      //TODO: return user obj

      const {
        username,
        password
      } = req.body

      const user = await Users.findOne({
        username
      });

      if (!user) throw new Error('User not found')

      const isValid = await verify(password, user.password)

      if (!isValid) throw new Error('Incorrect password or email')

      res.json('Login successfull', user)

    } catch (error) {
      res.json('' + error).status(403)
    }
  })

router.route('/:id/updateStats').put(async (req, res) => {
  try {

    const existUser = await Users.findOne({
      _id: req.params.id
    });
    existUser.score = req.body.score;
    const updatedUser = await existUser.save();
    res.send(updatedUser);

  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
return router
};
