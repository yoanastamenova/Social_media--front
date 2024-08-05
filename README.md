# Social Media API Project ❤️

Welcome to PeakConnect, a mountainers-inspired social media project, designed and developed with versatility and robust functionality in mind. 

<img src="./src/img/logo.png">

<hr>
  <summary> Table of contents 📝</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#er-diagram-from-sql">Database Diagram</a></li>
    <li><a href="#clond">Clone</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#future-functionalities">Future functionalities</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#appreciations">Appreciations</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

<hr>

## About the project

The main idea for the project was recreating a social media for people that love meeting other people and go on mountain adventures with them. Constructed with the use of non-relational database technology (MongoDB in conjunction with the Mongoose library), this API gives birth to a social media application where users can engage, share, and interact through texts and image posts. It has the same functions as most famous social medias but this specific one is created only for the people in the mountains. Hope you like it!

<img src="./src/img/view.webp">

## Core Features

Our API boasts an array of features focused on delivering an engaging and seamless user experience. The core functionalities include:

- User Management: Enabling users to register, log in, update their profile, and check out their personal details on their profile.

- Post Management: Users can create, update, and delete their posts. They can also view their own posts as well as posts created by other users. The option to find a specific post adds an additional layer of navigation.

- Interaction: Users can like or dislike posts to express their sentiments. A follow/unfollow feature is also available, allowing users to curate the posts they see based on their preferences.

- Admin Control: Special functionalities are available exclusively for administrators and super administrators, ensuring streamlined content and community management.

- In addition, the use of seeders offers a quick and efficient method for data insertion during a database refresh. Middleware support exists for implementing authentication processes such as tokenization.

With successfully achieving the development milestone and deploying the project to production, the next exciting step is creating a dynamic front-end view using React. This will not only enhance the user interface but also ensure a cohesive, interactive, and intuitive user experience!

Stay tuned for this exciting update! :)

<img src="./src/img/giphy.webp">

## Deploy 🚀

<div align="center">
    <a href="https://social-media-app.zeabur.app"><strong> Click here! </strong></a>🚀🚀🚀
</div>

## Stack

Used technologies for the project:

<div align="center">
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&" alt="TypeScript" />
</a>
 </div>

## Schema from Mongo

<img src="./src/img/monogsch.png">

- 1 Strong entitiy 
    - Users (can exist by itself without depending on another entitiy).
- 2 Weak entities 
    - Posts (depends on users, it must be written/posted by a user).
    - Friends (related between users)
<br>

Even that we have a non relational database project, there is a relation between
the posts and users as a post cannot exist by itself. A post can have likes such as user can have users that he/she follows and on the contrary users that are following.

## Local installation guide

1. Clone the repository from the url:
`git clone https://github.com/yoanastamenova/Social_media.git `
2. Connect the cloned repo with MongoDB 
-  If you dont have Mongo we can use already existing Mongo container from Docker with the following command:
` docker run -d -p 27017:27017 --name mongo -v mongo_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest `
3. `npm install`  (to get all the npm needed packages)
4. `npm run dev` to run our server
5. ` npm run seed ` to fill our documents


## Endpoints

### Authentication 👓
| Method | URI                    | Action           | Auth        | Body |
|--------|------------------------|------------------|-------------|------|
| POST   | /api/auth/register     | Register user    | N/A (public)|{ "email": "youremail@email.com", "password": "yourPassword" }    |
| POST   | /api/auth/login        | Login user       | N/A (public)|{ "email": "youremail@email.com", "password": "yourPassword" }      |
### Users 👦🏻 👩🏻
| Method | URI                   | Action              | Auth                | Body |
|--------|-----------------------|---------------------|---------------------|------|
| GET    | /api/users/all            | View all users      | Token (admin)   |      |
| GET    | /api/users/profile    | View user profile   | Token (user)        |      |
| PUT    | /api/users/profile/update    | Update user profile | Token (user) | info to update     |
| GET    | /api/users/email    | Get user by email  | Token (user) | "email": "mail@ex.com"  |
| DELETE | /api/users/:id   | Delete user by id  | Token (user)        |      |
| PUT    | /api/users/role   | Update user role  | Token (user)        | "role": "admin"   |
### Posts ✍🏻
| Method | URI                        | Action                | Auth        | Body |
|--------|----------------------------|-----------------------|-------------|------|
| POST   | /api/posts/create                 | Create post           | Token (user)|      |
| DELETE | /api/posts/delete/:id             | Delete post           | Token (user)|      |
| PUT    | /api/posts/update/:id                 | Update post           | Token (user)| info to change    |
| GET    | /api/posts/own             | Get own posts         | Token (user)|      |
| GET    | /api/posts/all             | Get all posts         |  Admin |      |
| GET    | /api/posts/:id             | Get post by id        | Admin |     |
| GET    | /api/users/posts/user/:id  | Get posts by a user id  | Admin |      |
### Like 🫶🏻
| Method | URI                        | Action                | Auth          | Body |
|--------|----------------------------|-----------------------|---------------|------|
| POST    | /api/posts/likePost/:id        | Like/Dislike post by id | Token (user)  |      |  
### Follow 👋🏻
| Method | URI                        | Action                | Auth          | Body |
|--------|----------------------------|-----------------------|---------------|------|
| POST    | /api/users/followUnf/:id       | Follow/Unfollow user from id| Token (user)  |      |                                      |
### Timeline 🏄🏻‍♂️
| Method | URI                        | Action                | Auth          | Body |
|--------|----------------------------|-----------------------|---------------|------|
| GET    | /api/users/timeline       | Shows user timeline | Token (user)  |      |                                       |


## Future functionalities

✅ Add timeline option 

⬜ Add user biometrics

⬜ Include profile privacy options

## Contribute to the project

Feel free to suggest an improvment or functionality to my project.

There are two ways of doing this:

1. Opening an issue
2. Creating a fork of the repository
   - Creating a new branch
     ```
     $ git checkout -b feature/yourUsername -feat
     ```
   - Make a commit with your changes
     ```
     $ git commit -m 'feat: this X thing'
     ```
   - Make a push to the branch
     ```
     $ git push origin feature/yourUsername -feat
     ```
   - Opening a Pull Request

## Development:

```js
const developer = "yoanastamenova";

console.log("Developed by: " + developer);
```

## Appreciations:

Forever gratefull to GeeksHubs Academy for the oportunety to learn and grow on my career path. <3

## Contact

<a href = "mailto:micorreoelectronico@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/linkedinUser/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</p>