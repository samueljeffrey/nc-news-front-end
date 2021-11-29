# My Northcoders News API

---

## Description

This project has been to develop a front end app for a news website, with its functionality facilitated by my own backend API, which I built prior to this.

---

## Try the React App

#### The hosted React App can be found here: https://samuel-jeffrey-nc-news.netlify.app/.

#### The API which I created and used for this project is found here: https://samueljeffrey-nc-news.herokuapp.com/api.

---

## Check out the project for yourself

### 1. Clone the repository

In your terminal, when in your chosen directory, run the following command:

```http
git clone https://github.com/samueljeffrey/nc-news.git
```

Once cloned, enter the new directory and open it in your editor, via the following commands in the terminal:

```http
cd nc-news
code .
```

---

### 2. Install dependencies

You'll first need to make sure that your code editor has a minimum of Node version v16.0.0 installed. In order to install react, which enables you to run the project from a local server within your computer, type the following commands into your code editor's terminal:

```http
npm install
```

---

### 3. Try the app

To run and use the app with all its functionality, from a local server, simply run the following command in your computer:

```http
npm start
```

A new window will open up and you can explore the app from there.

The app has the following functionality:

- The "switch user" button in the header will take you to an options page (the user is always "grumpy19" by default when loading up the app). When selecting an option, the change is immediately effective throughout the app.
- The new article button in the header takes you to a dedicated page. This button is clickable regardless of which user is signed in and multiple articles can be created consecutively by the same user.
- The "NC NEWS" title in the header, as well as the four topic choice buttons, will take you to the home page, regardless of where you are in the app, and the article list in that page will be appropriately filtered.
- The article list in the homepage can be sorted and ordered by date created, number of comments, vote count and author names alphabetically sorted. These four options are also available reversed.
- When viewing an article, a user can upvote or downvote the article if the article was not written by them. When the signed-in user is viewing their own article, however, they can choose to delete it (there is a second step to this deletion process, to prevent accidents).
- Every article page has a comment section at the bottom, and each comment within that section can be deleted, if it was posted by the signed-in user, or voted on, if another user wrote it.
- Any user can add a new comment to an article, or several consecutive comments, regardless of whether they wrote the article or not.
- If you type in a non-existent url for this app, you will see only the header and the statement "Page not found", although a request for an article with an ID which does not exist will see the message "Article not found" rendered.

---

#### Thanks for having a look at my React App
