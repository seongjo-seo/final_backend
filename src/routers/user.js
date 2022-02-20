// @ts-check

/* eslint-disable no-console */

const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const USERS = {
  15: {
    nickname: 'foo',
    profileImage: undefined,
  },
  16: {
    nickname: 'bar',
    profileImage: undefined,
  },
}

router.get(`/`, (req, res) => {
  res.send('User list')
})

router.param(`id`, async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found.')
      // @ts-ignore
      err.statusCode = 404
      throw err
    }

    // @ts-ignore
    req.user = user
  } catch (err) {
    next(err)
  }
})

router.get(`/:id`, (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('main', {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
    })
  }
})

router.post(`/`, (req, res) => {
  res.send('User registered.')
})

router.post(`/:id/nickname`, (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res) => {
  console.log(req.file)
  // const { user } = req

  // user.profileImage

  res.send('User profile image uploaded.')
})

module.exports = router
