# Notebook App

## Introduction

This application was build using React with TypeScript on client application and NodeJS, Express, MongoDB and GraphQL in the server application.

The application let the users to create notebook, pages, and notes. For the meantime the application's client side was only saving the data within browser's local storage while the server application was still under development.

**_PS: This application is only my side project to practice grid layout as well as maximizing TypeScript technology._**

## Frontend

The client side of this application was built with React Typescript and the use of Context API for global state management of the application. I also implemented a grid layout system for organizing my the notebook page as well as its content. Currently, I only built a layout for large screens but soon I will also implement for small screens like phone and tablets.

### Notebook UI

This page is the initial look of the application without any notebooks, pages, and notes created.

<img src="https://github.com/dwrdvncntcvs/notebook/blob/master/assets/Initial%20Page.png" width="100%"/>

### With Page UI

This page is the look when a notebook is created.

<img src="https://github.com/dwrdvncntcvs/notebook/blob/5057d56c836ee4952cdbd97e57a2e68e17f04dc6/assets/Page%20Created.png" width="100%"/>

### With Notes UI

This page is the look when a page is created.

<img src="https://github.com/dwrdvncntcvs/notebook/blob/master/assets/Note.png" width="100%"/>

## Backend

The backend side of the application was created with NodeJS, ExpressJS, GraphQL, and MongoDB. I normally create backend with Express without using GraphQL. However I'm currently learning how to use GraphQL technology to create backend application.