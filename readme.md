# Instructions To Run Docker Image

1. docker compose up --build (first time)
1. docker compose up (afterwards)
1. open localhost:3001 on your browser

# To Start The APP (BackEnd and Frontend Together)

This is only for viewing the app (production mode)

1. create a env file with
   a. MONGO_URL (mongo database uri)
   b. SECRET_KEY (for jwt token)
2. npm i
3. npm run build
4. npm start
5. Visit localhost:3001 on your browser

# In Order To Start Backend And Frontend Seperately

This is for dev environment

## Backend

1. create a env file with
   a. MONGO_URL (mongo database uri)
   b. SECRET_KEY (for jwt token)
2. npm i
3. npm run build
4. npm run dev

## Frontend

1. cd frontend
2. npm i
3. npm start
