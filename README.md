Lunch Tracker
=============

Keep track of what you had for lunch :)

Development
===========

Follow these steps to get started:

Database Migrations
-------------------

1. Create the database.
1. Create the schema "lt"
1. Create a user and set the default schema for the user to the "lt" schema.
1. Create a postgrator.json file in the migrations folder with [this format](https://github.com/MattiLehtinen/postgrator-cli#the-tool).
1. Fill in the correct values for your database from the previous steps.
1. In the _migration_ folder, run `yarn postgrator`.
