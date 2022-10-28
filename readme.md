<h1 align = 'center'>🔨 File upload with Multer</h1>

<div align="center">

[![](https://img.shields.io/badge/Made_with-Nodejs-green?style=for-the-badge&logo=node.js)](https://nodejs.org/en/)

</div>

### Installation

```
cd upload-with-multer
npm init -y
npm i express dotenv multer nodemon pg
touch index.js readme.md
```

Now run the project using

```
npm run dev
```

```
The magic happens on port 8080
```

### 💡 Handle file upload in NodeJS

You want to allow your users to upload a profile picture. For that, you already set up some HTML:

```
<!DOCTYPE html>
<html>
 <head>
   <meta charset="UTF-8">
   <title>File Upload Exercise</title>
 </head>
 <body>
   <form method="POST" action="/upload-profile-pic" enctype="multipart/form-data">
       <div>
           <label>Select your profile picture:</label>
           <input type="file" name="profile_pic" />
       </div>
       <div>
           <input type="submit" value="Upload" />
       </div>
   </form>
 </body>
</html>
```

### 💡 Your Mission

You need to set-up the back-end to accept that profile picture, save it on your server, and send back the picture itself to the client.

### 💡 How do I do that?

The best way is to use the Multer NPM package. It’s a middleware for handling multipart/form-data, primarily used for uploading files.

See the [Multer](https://www.npmjs.com/package/multer) documentation.

### 📌 Level 1:

- Copy-paste the above html boilerplate into an index.html file
- Set up your Node/Express server like we’ve previously seen
- Create a POST route handler for /upload-profile-pic
- Try to set up Multer on your server following the documentation. You’ll have to set a destination storage, and the way you want the filenames to be handled ([help](https://medium.com/dataseries/configuring-express-multer-middleware-and-checking-file-information-497dc7af9eea), [help](https://www.npmjs.com/package/multer#diskstorage))
- Pass the middleware to your **POST** route handler; see if you can _console.log(req.file)_ inside of it
- If you can; you’re all set, you might want to implement some error handling logic here in case you don’t have a file
- And then some logic when you do have a file. Look at the info you get. Check if the file is saved correctly, with the right extension name (tip: _Multer removes the filename extension by default_, so you need to add it back) ([help](https://nodejs.org/api/path.html#path_path_extname_path))
- You’ll need to use another application level middleware for Express to handle serving static files to the client ([help](https://expressjs.com/en/starter/static-files.html))
- You want to send the picture back to the client for immediate display. You can res.send(`‘<h2>Here is the picture:</h2><img src=”<the path to the image on your server>” alt=”something”/>’`) here ([help](https://expressjs.com/en/api.html#res.send))

### 📌 Level 2:

- Move all your file upload logic to a separate module inside a utils folder
- Implement a file filter to only accept images ([help](https://www.npmjs.com/package/multer#filefilter)); for this you can check the file’s original name ([help](https://www.npmjs.com/package/multer#api)), and have a regex to check the extension ([help](https://www.regextester.com/?fam=116725), [help](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)) or [you can check the mimetype of the file](https://www.npmjs.com/package/multer#api)) and send an error when passed something else
- Create a new **POST** route handler for **/upload-cat-pics**
- Add the following after the first form in the HTML boilerplate:

```
<br />
  <hr />
  <br />
  <form method="POST" action="/upload-cat-pics" enctype="multipart/form-data">
    <div>
        <label>Select your cat pictures:</label>
        <input type="file" name="cat_pics" multiple />
    </div>
    <div>
        <input type="submit" value="Upload Cat Pics" />
    </div>
</form>
```

- This time, you have to handle a multi file upload ([help](https://www.npmjs.com/package/multer#arrayfieldname-maxcount))
- Return all the uploaded pictures to the client

### 📌 Level 3:

- Create a table pictures in a database with the following columns: **pic_id, name** (original filename), '**path**' (where the picture is stored)
- When the user uploads a single picture, or multiple pictures, it should get stored in the database
- Insert a link into your HTML that will point to /get-pics & create GET a route handler for **/get-pics**
- This route handler should get all the pictures previously uploaded in the database and return them as a list of links to the user. The user should be able to click on a link, and view the picture
