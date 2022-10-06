# Javascript is Synchronous in nature but can manipulate JS to behave asynchronously:
1. you may sometimes need to fetch data from the server, something you do not anticipate occurring NOW. So, you want the code to execute asynchronously. In these circumstances, you may not want the JavaScript engine to halt the execution of the other sequential code.
2. A callback is a function passed as an argument to another function. A callback function can run after another function has finished
3. Functions running in parallel with other functions are called asynchronous.
- In the real world, callbacks are most often used with asynchronous functions. Example: setTimeout() 
4. How WEB API, callback queue, Event Loop and Call Stack works:
- When a WEB API function occurs(setTimeout func), park the callback functions in a queue.
- Keep executing code as usual in the stack.
- Simultaneously Web API/Browser API runs a timer specified in setTimeout func. After it finishes:
- The event loop checks if there is a callback function in the queue.
- If so, pull the callback function from the queue and put in to the stack and execute.
- COntinue this loop

# Promises:
1. A promise is a JavaScript object that allows you to make asynchronous(aka async) calls. It produces a value when the async operation completes successfully or produces an error if it doesn't complete.

example: A buzzer is a literal promise for your food to arrive at some point
As soon as the buzzer goes off, the promise made to you is resolved, and you can go and claim your food. Only then, it is available to you for eating.

const fakeRequest = (url) =>{
    return new Promise( (resolve, reject) =>{   
        const rand= Math.random();
        setTimeout( ()=>{
            if (rand < 0.7){
                resolve("Your fake data is here") //data
            }
            reject("Request error!") //this error is returned otherwise
        }, 2000)
    })
}
//2nd line returns promise obj tht will b eventually be "fulfilled and give some data" or will give error, "then" we can make use of tht data. 

fakeRequest('/fakeAPI/1')
    .then((data)=>{
        console.log("Promise resolved with following data");
        console.log(data)
    })
    .catch((err)=>{
        console.log("catched the error returned from promise - ", err)
    })


# Async - Await keywords:
1. these 2 keywords are for making syntax more easy to read and understand.
2. Async functions always returns a promise. If func returns a value then promise is resolved with that value.
3. If the func throws an exception, the promise will be rejected.
4. await keyword ony works inside of functions declared with async keyword. await will pause the execution of function, waiting for a promise to be resolved.

# AJAX:
1. AJAX is a developer's dream, because you can:

Update a web page without reloading the page
Request data from a server - after the page has loaded
Receive data from a server - after the page has loaded
Send data to a server - in the background
??? 


# Connecting MongoDB and Nodejs using Mongooose:
1. mongoose.connect(to local server)
2. check if connection is made
3. create mongo schema defining types of fields of documents 

- mongoose also allows built in validations to apply like required:true, set default values and constraints like minlength(checks if string has length greater than minlength value), enum for string type (checks if value is in given array)

- mongoose validates all the data according to specified schema before seeeding/inserting into database 

4. create Model with model name and Schema name that creates a class or in mongoDB terms a collection
5. Model is helpful to create new instance/document that can be stored inside Database using .save() method on tht instance.
6. Models have methods like find({}), findOneAndUpdate({})



# Routes:
1. GET /products - homepage where all products will b displayed. Product names will b links with href=product.id to go to its corresponding details/show page
2. GET /products/:id - using id in req.params, find product by id and render products/show page. 
3. GET /products/new - should render a form page
4. POST /products - For getting data from post req in req.body, use urlencoded middleware. Data submitted from above form should be taken to create instance of Product class. Then save it to database. After form submission, redirect to show page using instance._id of tht product.
5. GET /products/:id/edit - Create edit form. Prepopulate form using values attribute= "<%=product.name%>". the form will submit to show page(form action). render /products/edit page where form is created.
6. PUT /products/:id - install method-override package. Add query string ?-method=PUT on form action. Use findByIdAndUpdate(id, req.body) .Then redirect to show page of tht product
7. DELETE /products/:id - add delete form on show page, add method-override. Use findByIdAndDelete(id). Then redirect to main page



# MIDDLEWARE:
1. performs: make changes to req and res objects
2. end the req-res cycle
3. call the next middleware func in stack
4. express.static inside app.use tells express to serve static files on every req

app.use((req, res, next)=>{    
    //.use sends whatever in this callback to all path req coming in
    //next is a function, executing next() will invoke next matching route or middleware
    console.log("first middleware")
    next()
})
app.use((req, res, next)=>{  
    console.log("second middleware")
    next()
})
o/p: first middleware
    second middleware


# Approach of Project:
1. First created basic express app, setted up the local server, setted ejs engine, views directory
2. Made Campground Schema which includes Name, Description, price, location, author, reviews, image. Created Model. Connected Nodejs and MongoDB with Mongoose
3. Export Model to main javascript file from where u will insert or just get data
4. Created index.js where i made mongoose connection with MongoDB and seeded some dummy data/documents into Campground Model/collection
5. Made all routes(All CRUD)
6. Did some styling of all Pages using HTML, Bootstrap and EJS to add dynamic content 
7. Errors could come up bcoz of connecting with APIs, incomplete data from form, server side error
8. Mong Relationship Implementations:
- One to Many relationship implementation in mongoDB: 1 Reviews collection and 1 Campgrounds collection tht have reviews property tht is an array of object ids of reviews documents and a reference to Review Model. Parent has multiple child references.
- One to Bajilions relationship: Instead of having refernece on parent of childs, Here 1 Author can create many campgrounds so each campground(child) will have ref to its Author(parent). So Campground will have author property which has author document id.
- Add reviews prperty in Camogrounds Schema with type= ObjectId, Create Reviews Schema separetly
9. Create form for reviews in Show page
10. POST /campgrounds/:id/reviews - use findById to find campground then create new instance of Review Model using req.body.review property. Then push tht review into campground and save both to databse then redirect to show page
11. using populate on campground to get all data not just object ids, pass tht campground obj to show.ejs.
12. DELETE /campgrounds/:id/reviews/:reviewsId - Create form to delete for each review, use method override on form action. First pull reviewId from reviews array property of campgrounds, then delete review from Review Model using corresponding reviewId. Finally redirect to show page
13. When we DELETE any campground, we need to delete its all reviews from Reviews Collection too. By using Moongoose method, we can get(access) campground document after deleting it. Then get the ids from reviews property of campground document, delete its corresponding document from Reviews Collection.

***AUTHENTICATION: ***
14. create a session id and store it in browser for authentication using session config object where i defined a secret and expiry date of the cookie storing the session id.
15. Passport is a library that helps to add authentication to Node apps. Create User Model whose Schema has only email. Username, hash value and salt are automatically added by Passport in MongoDB Document.
16. GET /register - renders a form to submit email, username, pwd. Getting username and pwd form req.body. Create new User instance using tht info. 
17. Using .register method tht takes in new user instance and a pwd which will hash the pwds and store the salts and hash the result. This takes time so await this line. Redirect to home page.
18. GET /login - renders a form to submit username and pwd. In POST /login , then use .authenticate method and finally redirect to home page
19. To protect routes like creating new camoground, poassport provides .isauthenticated method to check the same, redirecting back to home page.
20. GET /logout - using passport to logout(). then redirect back to homepage. Create 3 links on navbar(register, login, logout). 
21. passport provides req.user which is info stored in session when someone logins or registers which gives user_id, username, email. So if a req.user is not undefined then show logout button only. We are using user info from session and not just checking if there is some user_id in session or not using .isauthenticated method bcoz we want username of user to show when he has created any new campground or added a review.
22. When user has registered, login him using passport req.login method which compares pwd against given username in DB.
23. When user is requesting some page which requires loggin, he then logs in, we need to display the page he was requesting earlier,
To do tht, after checking if he is authenticatd, store the url he is requesting before redirecting to only home page. setting session.returnTo to some absolute path, u can be redirected to after successful authentication. So after logging in, check req.session.returnTo value, of this is empty then redirect to homepage other wise redirect to tht value.

*** AUTHORIZATION ***
24. Associate current logged in user with created campground or review by extracting user data from session and storing it in author's field of campground and reviews collection. 
25. If not author of campground, add a condition in show page tht if session.user is not same as author of campground, then hide edit and delete buttons. 
26. If not logged in then you shouldnt see review form on show page, so add condition tht if there is session.user contains some user_id then only show review form.






# ERRORs:
1. wrong id of campground
2. missing data in form 
3. casting errors
4. writing rubbish in form
5. entirely wrong route
6. server side validations check using postman and implemented using joi Schema and handling using ExpressError class and rendering our error template
7. if i delete a campground, and anyone goes to that :id of campground, its an 404 error
8. 


# for Many reviews on One campground page:
1. url: /campgrounds/:id/reviews
2. delete a particular review : remove object of id of tht review from campground.reviews, then delete review by id then redirect page back to show page.
3. Mongoose Middleware: when campground itself is deleted, we need to delte reviews associated wid it: in async func, we paas doc, and access tht doc/campground to delete all reviews assocaited wid particular campground.

# ROUTER:
1. Router helps to divide files into groups starting wid same prefix.
2. combining these routes into single application, instead of populating everything in one place.


# COOKIES:
Cookies can be used to remember information about the user in order to show relevant content to that user over time. For example, a web server might send a cookie containing the username that was last used to log into a website, so that it may be filled in automatically the next time the user logs in.
Many websites use cookies for personalization based on the user's preferences. 

1. Cookies is info tht are stored in user's browser when browsing a particilar website
2. cookies allows to make http stateful(like remebering user's shopping cart)
3. cookie acts as a unique identifier.
4. evert time user comes back on website, cookie will b sent along wid that req, to use info like how many times user has been on the page, location, etc


# Signed Cookies: 
1. is like digital signature, to verify content is not changed or manipulated and to verify senders identity. Eg: wax seal on letter, to verify no one has opened the letter
2.So here server sends a signed cookie to user, user sends back the signed cookie, now on server side, using cookie parser server checks if any of these signed cookies are tampered.


# SESSION:
1. not very secure to store lot of data (like password) in cookies, so session are a server side data store and not in browser
2. limitations of cookies: how many cookies can browser store in 1 domain and size of info cookies can store.
3. sessions are temporary store not permanent like database.
4. when session is recorded in server, it sends browser a cookie with session id tht can be helpful for browser to retrive data from session, wid the help of id 


# FLASH:
1. place in the session to flash a message like success, its usally afeter an action and before redirecting to other page,
2. after initialisig a flash message in route after an action and before redirection, a middleware is to be defined, which takes care of flashing the req with res.local.success or res.local.error  ///????

# ****** AUTHENICATION FROM SCRATCH: ******

# AUTHENTICATION:
verifying "who" a particular person is - using pwd, facial recognition, security ques

# AUTHORIZATION:
after someone is authenticated, 
Authorization is verifying what user has "access" to like delting something from app or editing...


# How passwords is stored in DB:
1. Run a password through a hashing function first and then store the result in database.
2. When user enters username n password, we run through the same hasing algo and we get the result, then compare tht result with hashed pwds in DB.
3. Crytographic hash function properties:
- No way to figure out my real pwd using hashed result stored in DB. Reverse of hasing func don't work.
- a small change in input should yield a large change in hashed result. 

# SALTing:
1. is to add some random value to pwd, so that it drastically change the hashed value and ensures unique hashes, useful for safeguarding same passwords.
- eg: pwd is:123456
123456LOL => hash: jshfjshd
123456OHH => hash: klfjlksd
2. This is done so tht when hacker gets the actual pwd of one of the hashed result, he cannot just know pwd of other accounts where hashed result is same.
3. even though pwd is same, bcoz of salt, its hash value is very diff hence, hackers cant know tht its same password. 

# Using BCRYPT to hash a password:
1. Generate the salt 
1. user login
2. add permissions
3. associating posts and comments to user

# Register a user:
1. go to GET /register route and render a form, POST /register to submit data, password submitted to it will be in req.body bcoz we r using urlencoded middleware of express.
2. use bcrypt to hash the password.
3. Create User Model, create new instance of User class, store username and hashed password there, save instance and redirect to home page.

# Login a user:
1. go to GET /login route and render a form, POST /login to submit data.
2. find by username in database, to find the user.
3. using bcrypt compare incoming password form form to password associated with user that u found in above step.
4. if valid password, render home page

# Staying user logged in:
1. If your username and password matches then only server will store user_id associated with tht user in session(req.session) and server sends back to browser with cookie containing session_id .
2. Same follows for first time registration.
3. we are using user_id for loggin in bcoz we need username of tht user to add a comment/review and so on.
4. While accessing any page that requires user to be logged in, then check if session has user_id or not.

# Logging out:
1. If your are logged in, render a logout page which have a form with a logout button. Pressing it shoudl take you to:
2. POST /logout which destroys the session using req.session.destroy()
