# Master of reading

This is an application that help pre-school kids improve their reading skills in Ukrainian

[Application](https://master-of-reading-radoshdev.vercel.app/)

## Used technologies
1. [Vue.js](https://vuejs.org/) for build the application;
2. [Vue router](https://router.vuejs.org/) for routing pages;
3. Modular SCSS for styling;
4. Used [Pinia](https://pinia.vuejs.org/) for state management
5. [Vitest](https://vitest.dev/) used for testing;
6. Configured as a PWA;

## How it works

### There are 3 level of reading:
1. Letters
2. Syllables
3. Words

* Each level has its own complexity

### Reading process
* After starting a round (by pressing "Початок"), a text appears for reading.
* At the end of each round, the child earns one coin.
* The length of the round depends on the chosen difficulty (5 - 10 words/syllables/letters)
* By default, the ability to speak a word in a synthetic voice is set
* It is also possible to choose the case for letters (upper case by default)
* By clicking on three dots in the upper right corner, there are ability to change the case and to turn off the sound.
* You can also set the behavior for earning coins by clicking on a coin, select an action (add/subtract) and enter the initial amount.
* After each completed round, a random Pokemon image will be shown

### Additional functionality for words
* When you click on the icon "?", the explanation of the word on Wikipedia opens
* When you click on the image icon, the image of this word is shown by searching in Google images
