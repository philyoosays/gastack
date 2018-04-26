# Stack Overflow For GA

## Initial Thoughts on Functionality

The initial thoughts on schema would be that we need to track users, posts, comments, and favorites. 

### Functionality Scribbles (work in progress)
This is in no particular order. I'm just adding things to this as I think of them.

    - user registration
    - user login and authentication
    - user authorization
    - *** the ability to post
    - *** the ability to comment on posts
    - *** the ability to up or down vote
    - *** an algorithm to weight the posts
        - The algorithm needs to know the view count as well.
    - the ability to favorite posts
    - a division between the various programs GA offers
    - *** a search feature to search the text of posts (stemming)
    - cheatsheet and helpful resource links
    - a user profile with github link and photo
    - save the searches to better improve the stopword list and to have a body of data for a neural net

## Initial Thoughts on Design

    - left-side navigation bar
    - mobile friendly
    - wooden floor background for the sidebar nav
    - white main area
    - red accents (probably hover overs)

## Thoughts on Searches

    - First search the DB via tsquery, returning the matches
    - Then search the comments for the highest scores
    - How do I prioritize the post score and the comment score?
    - Answer for ^... I think I simply add the two scores together. That way a hot post with hot comments will supercede a hot post with poop comments. Further, it gives older posts with really hot comments to rank. Do I even keep track of comments score separately or do I simply add any value from the comments to the post score?
    *** Every search needs to have a single | pipe on it to make it an OR search between words
    

## Initial Thoughts Main Page
