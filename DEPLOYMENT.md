# CREATE THE REPO
heroku create backendName
heroku create frontendName -b https://github.com/mars/create-react-app-buildpack.git

# Add the git paths to remote
git remote add <REMOTE-FRONTEND-NAME> <GIT-URL>
git remote add <REMOTE-BACKEND-NAME> <GIT-URL>

# Check that the remote is here
git remote 

# Add environment variables to Heroku

# Push to heroku
git add .
git commit -m "message"
git subtree push --prefix <FOLDER-NAME> <REMOTE-FRONTEND-NAME> main
git subtree push --prefix <FOLDER-NAME> <REMOTE-BACKEND-NAME> main

https://git.heroku.com/ms-finalcap-backend.git
https://git.heroku.com/ms-finalcap-frontend.git