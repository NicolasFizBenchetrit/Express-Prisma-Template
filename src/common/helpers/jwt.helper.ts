import { sign } from 'jsonwebtoken'

const generateTokens = (id: number): { accessToken: string; refreshToken: string } => {
  // Access token
  const secretAccessKey: string = process.env.ACCESS_TOKEN_PRIVATE_KEY as string
  const accessExpiresIn = '15m'
  const accessToken: string = sign({ id }, secretAccessKey, { expiresIn: accessExpiresIn })
  // Refresh token
  const secretRefreshKey: string = process.env.REFRESH_TOKEN_PRIVATE_KEY as string
  const refreshExpiresIn = '30d'
  const refreshToken = sign({ id }, secretRefreshKey, { expiresIn: refreshExpiresIn })
  return { accessToken, refreshToken }
}

const generateTemporalToken = (id: number): string => {
  const secretTemporalKey: string = process.env.TEMPORAL_TOKEN_PRIVATE_KEY as string
  const temporalExpiresIn = '5m'
  const temporalToken: string = sign({ id }, secretTemporalKey, { expiresIn: temporalExpiresIn })
  return temporalToken
}

export default { generateTokens, generateTemporalToken }
