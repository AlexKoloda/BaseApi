FROM node:22-alpine3.19 AS build
WORKDIR /back
EXPOSE 4000
COPY ./ ./
RUN npm install 
FROM node:22-alpine3.19
WORKDIR /back
COPY --from=build /back /back  
CMD ["npm","run","start"]
