import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Web Chat App',
      message: 'Chat to go'
    })
})

export default router