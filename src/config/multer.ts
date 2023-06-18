import { type Request } from 'express'
import multer, { type FileFilterCallback } from 'multer'
import crypto from 'crypto'
import path from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
  destination: (_request: Request, _file: Express.Multer.File, callback: DestinationCallback): void => {
    callback(null, './public/')
  },

  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    let hashedName = crypto
      .createHash('md5')
      .update(file.originalname + new Date().toISOString())
      .digest('hex')
    hashedName = hashedName + path.extname(file.originalname)
    req.body.imagen = hashedName
    callback(null, hashedName)
  }
})

const fileFilter = (_request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({ storage: fileStorage, fileFilter })

export default upload
