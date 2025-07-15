
# Paws & Preference Website - Netizen Experience Project

**Paws & Preference Website** is an app that simulates a tinder app but with cats 
<img width="2940" height="1912" alt="image" src="https://github.com/user-attachments/assets/e67aa1d5-1453-4c62-bf7a-4aec17124b4f" />

## Features
- View stack of cat images
- Swiping and clicking feature to like and dislike
- Summary page of liked and disliked cats
- Pictures are called using API
- Added media query for mobile UI/UX 

## Stretch Features
- Seamless rendering and transitioning between cards 
- Dynamic button effects when liking and disliking 
- Sound effects when liking and disliking 
- Glow border when dragging 
- Progress Indicator for how many cats left
- Background effects when liking and disliking 
- Grid view of the liked and disliked cats 
- Play again button

## Core Problem Encountered and Solution
- Problem: Initial implementation caused next card to be off centered after swiping for a split second and had a very bad rendering speed
![Problem](<Screenshot 2025-07-14 at 9.15.53 PM.png>)

- Solution: Adopted an approach used by Tinder and other swiping platforms by pre-rendering the next card to be swiped 

## Tech Stack
- Only frontend: React, HTML, CSS 



>>>>>>> origin/main
