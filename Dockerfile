# The following code defines the container which will run the nodejs api interface.
# All environment variables can be found in  
FROM node:11
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV PORT=8000
EXPOSE ${PORT}
CMD [ "npm", "start" ]