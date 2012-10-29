Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '282324831851627', 'ce4aaeb4e63d13ed2e6adea6eb354181' #localhost
  #provider :facebook, '406588376076948', '8979f4bc986b32cac2b9fcc96ba3304c' #pacific-hollows-5093
  provider :google, 'fusegap.org', 'GBhAKlZ1k4Qme-5fzF2LvaRT'
  provider :twitter, 'cxXXN0qbqyNcBTGUdApoaw', 'sahYrCxvai6XDgQ7fpoNMONC5uGPeOmIY5bHj6I8' #localhost
  #provider :twitter, 'ZUa4kb8EQ0qc7u7bxiL2Q', 'olyWWNJYQGZROgDubMv4AVM7XVcohEaGykVXxWUxNE' #pacific-hollows-5093
end