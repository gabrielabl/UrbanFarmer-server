
![Logo](https://urbanfarmer.netlify.app/static/media/urban-farmer-logo.747fb3c3338aabdcd514.png)


# UrbanFarmer-Server

A user-friendly app for connecting city residents passionate about urban farming and craft food production. Streamlined item listing for trade and facilitated community connections for food enthusiasts.

## Requirements

-  UrbanFarmer-client installed and running: https://github.com/gabrielabl/UrbanFarmer-client
- An existing database on mySQL for the purpose of this app

## Packages
JSONWEBTOKEN KNEX MYSQL EXPRESS BCRYPT CASUAL CORS DOTENV MULTER UUID
## Local Installation

1. Clone project to local machine

```bash
git clone git@github.com:gabrielabl/UrbanFarmer-server.git
```
2. Move to UrbanFarmer-server folder

```bash
cd UrbanFarmer-server
```

3. Install node modules

```bash
npm i 
```
3. Rename .env.sample file

```bash
mv .env.sample .env
```
  
5. Update environment variable to local server

- `CORS_ORIGIN=<Include the localhost for the urbanfarmer-client>`
- `PORT=<include a not used port>`
- `DB_LOCAL_DBNAME=<mySQL database name>`
- `DB_LOCAL_USER=<mySQL your username>`
- `DB_LOCAL_PASSWORD=<mySQL password>`
- `SECRET_KEY=<generated on the terminal of your choice>`
- `DB_LOCAL_HOST=<mySQL localhost>`

6. Database migration

```bash
npm run migrate
```

7. Populate database

```bash
npm run seed
```

8. Run application

```bash
node server.js
```
## Functionality

- AUTH: Login & Signup
- PROFILE - create and edit
- COLLECTION ITEM: add,edit and delete
- SEARCH: get all collection items or defined by user


## Future Implementation 


### Phase 2
- Messages: Users will be able to communicate with each other through a page of the application, and links to routes will be either at the header of the application or at the “trade” button in the user’s collection. Also, the user will be able to delete conversations.

- Friends: Enabling feature to link and add other users to your profile. The user profile will include a box that contains all friends and other profiles will have an “add friend” button. 

### Phase 3

- Testimonials: Enables users that have a link throughout friendship to post testimonials in each other's profile. Also enabling the receiver to delete testimonials. 

- Likes: Implementing a like button in the profile.

- Views: Implementing a view counter that will be updated every time another user visualizes the user’s profile. 

## Deployed version

https://urbanfarmer.netlify.app/


## Author

[@gabrielabl](https://github.com/gabrielabl)

