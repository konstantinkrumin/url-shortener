# [URL Shortener Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)

Stack: **Javascript**, **Node.JS**, **Express**, **MongoDB**, **Mongoose**

| API                     | HTTP Method | Description                   |
| ----------------------- | ----------- | ----------------------------- |
| /                       | GET         | shows main page               |
| /api/shorturl           | POST        | adds an URL to the database   |
| /api/shorturl/:shortUrl | GET         | redirects to the original URL |

This is an URL Shortener app that accepts a link in the input field, saves it to the MongoDB database and returns a JSON with a shortened version of the URL. Also, it will throw a JSON message with an error in case if incorrect URL is being passed as an input.

Then, you can put in the link with the shortURL value as `https://url-shortener.konstantinik1.repl.co/api/shorturl/:shortURL` and the app will address you to the corresponding site.

![App Image](https://i.imgur.com/WUtHpsM.png)
