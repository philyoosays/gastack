# CRM

# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

|  Day | Deliverable | 
|---|---| 
|Day 1: Tue| Wireframes and Priority Matrix|
|Day 2: Wed| Project Approval /  Pseudocode / actual code|
|Day 3: Thur| Basic Clickable Model |
|Day 4: Fri| Working Prototype |
|Day 5: Sat| Final Working Project |
|Day 6: Sun| Bugs / Stylying / PostMVP |
|Day 7: Mon| Project Presentations |


## Project Description

The project is a Contact Resource Management System (CRM). This kind of system can be used by a sales team, non-profits, or campaigns. It will keep track of leads/donors/constituents and their contact information, donations/sales, campaign attribution data, and any notes that the fundraising/sales team make.

Tip: Search for people with an m in the middle initial when testing because they have money data.

Post MVP, I am considering adding a fundraiser's profile with their sales data, an API call to Zillow.com's API to be able to show the user the home value of a particular donor so that the fundraiser can have a better idea of what dollar range to make their ask. Lastly, if I ahve the time, I want to represent data in the campaign overview page and the fundraiser's profile page with pretty D3 graphs.

## Wireframes

https://drive.google.com/file/d/1fskb4gy3oTPDvcZsDHgEv15w8Wjz_HF0/view?usp=sharing

## Database Schema

https://drive.google.com/file/d/14XLfs0FRO18f34lnzC-ah7onr4UCaWVs/view?usp=sharing

**** I'm deviating from the schema as drawn to eliminate the many to many relationship between addresses and people from my MVP. A many to many relationship between addresses and people will be a Post MVP feature.

## Priority Matrix

https://drive.google.com/file/d/1lqn45ruWOkCPUJMvzanOlpJuz3Acq8Sq/view?usp=sharing

### Important - Lots of Time
 - Person view
 - Create fake data
 - Models
 - People Search View
 - Server setup

### Important - Not Much Time
 - Build Schema
 - Campaign View
 - Login View
 - New Person View
 - New Note View
 - New Gift View
 - New Campaign View

### Not Important - Not Much Time
 - Fundraiser view

### Not Important - Lots of Time
 - Zillow API
 - D3 data representation

## App Components

### Landing Page - People Search View (PostMVP - Fundraiser Overview)
The MVP landing page for my app will be the People Search page but post MVP will send people to the fundraiser overview page.

The People Search View will contain input fields pertaining to the people like their name but also fields to input address information to pull up a list under the search fields for all matching people. Ideally the fields would be able to contain just partial data and not all the fields have to be filled in. The result list will be links to the person's individual view.

(POST MVP)
The Fundraiser Overview would contain the fundraiser's profile and their performance stats as well as the short list of their most recent notes prioritizing the notes that are marked as follow up (which will be a boolean field in the notes table)

### Person View
The Person view will contain the person's information like primary contact information. Giving stats will be a POST MVP feature. There will be three buttons. The all contacts, all gifts, and all notes. Each of these will lead to a view that displays the relevant data.

(POST MVP)
Under the buttons will be a short list of the most recent giving history and notes.
Also, an API call to the Zillow.com API will display the value of the home the person has listed.

### New Person View + Edit
A form to input a new person or contact information and the edit version (2 views)
Delete can happen here.

### New Note View + Edit
A form to add a new note and the edit version (2 views)
Delete can happen here.

### New Gift View + Edit
A form to add a new gift and the edit version (2 views)

## MVP 
 - Notes for people and donations
 - Gift entry and reporting
 - Campaign style labeling for donations
 - People entry and reporting
 - The ability to search for people

## POST MVP
 - Fundraiser's profile with performance statistics
 - Giving statistics on people
 - Performance statistics for campaigns
 - Use of the Zillow.com API for home value
 - Short lists in the person view of the most recent gifts and notes

## Functional Components

 - Database
 - Node server
 - EJS views
 - API Call

| Component | Priority | Estimated Time | Actual Time |
| --- | :---: |  :---: | :---: |
| Build Schema | H | .5hr | .5hr |
| API Call | H | 2hr | 1.5hr |
| Basic server and folder structure | H | 1hr | 1hr |
| People Search | H | 1hr | 4hrs |
| Views: person 1hr, new note 1.5hr, new gift 1.5hr, campaign 1hr, new campaign 1hr, new person 1hr| H | 7hr | 11hr |
| Models | H | 2hr | 3hr |
| Controllers | H | 3hr | 3hr |
| Routes | H | 3hr | 2hr |
| Make appropriate fake data | H | 2hr | .5hr |
| all edit views | H | 2hr | 2hr |
| styling | M | 2hr | 2hr|
| Total |  | 25.5hrs | 30.5hr |

## Helper Functions

I built a few data reformatting (to fit the schema) operations inside the controllers. I found that especially with date fields, data doesn't come back from the forms in the format I need. I used if statements to decide if a date with value empty string is an emptystring and needs to be converted to null before attempting to insert into the database.

## Code Snippet
if(result['SearchResults:searchresults'].message[0].code[0] === '0')

To deal with addresses that have no evaluation data on Zillow or typos and such, I used this if statement to say, if there is data, go thorugh the normal procedure. If there was any kind of issue, return strings that say 'no data available' so that instead of erroring, the CRM continues to work.

## Issues and Resolutions

My biggest issue by far on this project was getting my "fuzzy search" to work properly. I wanted the user to be able to type into any number of the fields, input partials or complete information, and the search will still work and find all the relevant people. Some discoveries that I made in the process of resolving this issue was that when a string is sent to the model, putting wildcards (%) on either end of the string doesn't work because the string has quotes so it's akin to saying %'searchForThis'%. And since none of the data actually contains quotes, this would break the search. I resolved the issue by concatenating the wildcards directly into the string so that it would look like this '%searchForThis%'.

Next, I had to build in a conditional to send form data to one of two models. I had to do that because zipcodes should not be partially matched. So the conditionally looked at the value of the zipcode and if it sees no value, it gets sent to a model with no zipcode match in the WHERE clause and vice versa.

The next hurdle was honestly that I had been staring at this one part of my app for too long and failed to realize until MUCH later that the WHERE clause I had wrote did not return what I was actually looking for. This would have been an easy fix except I had to figure out what to do about empty fields (null) in the database. After exploring many different strategies including dynamic fields, I decided that the simplest solution was to simply not allow null values in any of the fields that are being searched. Instead, I changed the schema to make the relevant fields default to empty string if no value is given. This way, if I don't fill in a field in the search form, this gets sent to the model from the form '%%'. The double wildcards had no problem dealing with empty strings.

All in all, looking back on the fuzzy search, it's actually not as difficult to do as I had experienced. One could look at the code and say that it takes a lot of fields to match but it's pretty straight-forward. It was difficult in practice because of the number of things that went wrong at once. If I fixed one thing, it was impossible to know if I did anything because the other problems would keep the "bug fires" burning seemingly as hot as it was before.

Another issue was the API call. The API I wanted is an XML api and it was a royal pain to work it. After a seemingly endless number of Google searches later, I managed to get the xml data, parse it to JSON and use it on the app.

