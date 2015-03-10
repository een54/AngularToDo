# AngularToDo

## Overview 
Small project to create a working To Do list using Angular and Firebase for data storage. 
Main use of the project is to familiarise myself with Angular and also to practice CSS. I also used it as an opportunity to practice using animations. I used CSS transitions, CSS animations and jQuery animations to gain experience across using multiple techniques.

## Frameworks used
- Angular
	- ngAnimate
- jQuery
- Firebase

## Installation (Assuming git is installed)
1 git clone https://github.com/een54/AngularToDo.git
2 bower install
3 ???
4 profit

## Basic usage
Create todo tasks and specify a target date to have it completed by. 
You can also archive tasks that you no longer require or that you don't want to focus on right now. They can be unarchived at any time.

In the configuration box you can add new tasks and choose to show or hide the list of archived tasks.

Marking a task as done will update the counter on the signpost.

## Future improvements
- Improved visuals
	- More styling on the tasks and the general appareance
	- Done animation improved to hit the correct point on the signpost
	- Add more animations
	- Custom buttons instead of using the standard appearance
- Fix bugs with external datepicker
	- Close the datepicker when a date is selected
	- Allow a second date to be chosen, as of now it doesn't update the value.
	- Add validation for when a date is not picked or the wrong format is entered.
- Ability to edit tasks with a timestamp
- Add user accounts with Firebase