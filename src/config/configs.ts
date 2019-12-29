export const systemCredentials = {
  email: process.env.SYSTEM_EMAIL,
  pass: process.env.SYSTEM_PASSWORD,
  service: process.env.SERVICE,
  dbUrl: process.env.DATABASE_URL
}

export const authConfig = {
  secret: process.env.SECRET,
  signOptions: { expiresIn: process.env.EXPIRES_IN }
}

export const emailConfig = {
  transport: {
    service: systemCredentials.service,
    auth: {
      user: systemCredentials.email,
      pass: systemCredentials.pass
    }
  }
}

export const databaseConfig = {
  provide: process.env.PROVIDE,
  dbUrl: systemCredentials.dbUrl,
  options: {
    useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
  }
}