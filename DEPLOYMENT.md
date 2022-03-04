# CREATE THE PROJECT ON HEROKU

heroku create <MY_PROJECT_NAME-backend>
heroku create <MY_PROJECT_NAME-frontend> -b https://github.com/mars/create-react-app-buildpack.git

# Add the git paths to remote
git remote add <NAME-OF-REMOTE-backend> <INSERT-GIT-URL-HERE>
git remote add <NAME-OF-REMOTE-frontend> <INSERT-GIT-URL-HERE>

# Check that the remote is there
git remote

# ADD ENVIRONMENT VARIABLES
Go to heroku settings -> "Config Vars" -> add DATABASE_URL to backend
REACT_APP_API_BASE_URL to frontend

# Push to Heroku
git add .
git commit -m "first commit"
git subtree push --prefix <NAME-OF-FOLDER> <NAME-OF-REMOTE-backend> main
git subtree push --prefix <NAME-OF-FOLDER> <NAME-OF-REMOTE-frontend> main

https://git.heroku.com/ms-finalcap-backend.git
https://git.heroku.com/ms-finalcap-frontend.git