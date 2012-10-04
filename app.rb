require 'rubygems'
require 'sinatra'
require 'nestful'
require 'haml'

enable :sessions

helpers do
  def partial(page, variables = {})
    haml "_#{page}".to_sym, { layout: false }, variables
  end
end

# root page
get '/' do
  @email = session[:email]
  haml :index
end

# second page
get '/second' do
  @email = session[:email]
  haml :second
end

# logs the user in
post '/login' do
  data = Nestful.post 'https://verifier.login.persona.org/verify',
          format: :json,
          params: { assertion: params[:assertion], audience: 'http://localhost:4567' }

  if data['status'] === 'okay'
    session[:email] = data['email']
    data.to_json
  else
    { status: 'error' }.to_json
  end
end

# logs the user out
post '/logout' do
  session.delete(:email)
end
