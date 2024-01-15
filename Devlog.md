# Balloon World Devlog

## Latest Update (v1.1)
- Add a backgrounds component to hold moving background items
- Added the scrolling clouds, balloons, and cool sun
- Changed the background image to fit better for 100% zoom.

## Take Home Prompt Deadline
Finally turned in the project for the Take Home Prompt deadline. Bringing in the art from my art team (which was my family drawing) was the best part. My daughter Isabell loved playing a character she helped create. Seeing everything come together with the art was awesome.
![image](https://github.com/JerryMcDonald/BalloonWorld/assets/35512632/38649ce5-2c0c-47e3-8a2c-4410851d814b)

## Handleing collisions
I came into this project pretty confident about my knowlage React's lifecycle. But makeing collisions work for Gerald really forced me to understand React hooks. The BalloonBoxes component ended up becoming a monster of a file. I was watching for changes in player position and jump stage and at the same time juggling a bunch of state in the component. Initially, I was all in with the `useRef` hook and trying to avoid those endless loops with my `useEffect` and function combos.  But this left me with a bunch of refs and I knew there was a cleaner way:
```javascript
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [balloonColor, setBalloonColor] = useState('red');
  const [blockTwoColor, setBlockTwoColor] = useState('red');
  const [showBalloon, setShowBalloon] = useState(false);
  const [balloonId, setBalloonId] = useState(initialBalloonId)

  const isUnlockedRef = useRef(isUnlocked);
  const balloonColorRef = useRef(balloonColor);
  const blockTwoColorRef = useRef(blockTwoColor);
  const showBalloonRef = useRef(showBalloon);
  const balloonIdRef = useRef(initialBalloonId)
```

I knew I had to step back, take a breath, and refactor this. Finally getting the redundent code out and managing state without looping into oblivion felt great. I was careful with my `useEffect` dependencies and think I did a decent job with `useCallback` within the BalloonBoxes component.
```javascript
  const [balloonData, setBalloonData] = useState({
      isUnlocked: initialBalloonStatus !== 'noBalloon',
      balloonColor: initialBalloonStatus !== 'noBalloon' ? initialBalloonStatus : 'red',
      blockTwoColor: initialBalloonStatus !== 'noBalloon' ? initialBalloonStatus : 'red',
      showBalloon: initialBalloonStatus !== 'noBalloon',
      balloonId: initialBalloonId,
    });
```
Much Better! 

## Get the art team working!
Lesson learned: Paying kids to do art will keep them off of electronics for hours
![image](https://github.com/JerryMcDonald/BalloonWorld/assets/35512632/4c6a47d0-98dc-4082-8c78-6809f0569c83)

## Laying Down the Foundation 
Started with just a square on a line. Got it moving left and right and jumping. Realized pretty quick I'd be dealing with pixels for all my game logic. Set up key listeners for moving the block and different jump phases.
![image](https://github.com/JerryMcDonald/BalloonWorld/assets/35512632/15980ee3-ea6a-449f-8b94-92a5a011bcce)

## Adding Puzzle Elements 
Added more boxes for buttons and three guardians. Should've split the guardians from the boxButtons component earlier, but happy with how I split the later components.

## Viewport Movement with the Player 
Getting more experience with React's `useRef` hook was cool. It's like having secret access in a React component, letting you mess with the DOM and keep things without causing drama with re-renders. Moving the viewport with the gameContainerRef's scrollLeft property as the player moves was a neat trick to learn.

## The Idea
Got inspired by a portfolio site that was like a side-scrolling Mario game. Drew out my idea and got to work.
![image](https://github.com/JerryMcDonald/BalloonWorld/assets/35512632/a6b9a76c-93c4-4d19-b92e-7516d741f7d5)

## Choosing the Technology 
Initially, I was going to set up an Azure SQL database but after chatting with the company, they suggested a local DB. That's when it hit me – thanks to Entity Framework being an awesome ORM, switching databases was a breeze. Also, remembered the company mentioning a faster compiler than Create React App, so I went with Vite for the frontend.

# Take Home Prompt Instructions:
- Create a single page web application that demonstrates basic CRUD operations (for example: To-Do List).
- Use React & TypeScript for the frontend and .Net Core & SQL for the backend/Database.
- Usage of EFCore and code-first migrations is encouraged.
