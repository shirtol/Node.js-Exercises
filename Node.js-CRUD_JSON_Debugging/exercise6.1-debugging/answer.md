## Answer

In the images [image 1](fail.jpeg) and [image 2](fail2.jpeg) we can see that the program fails in line 74 `foodObj.forEach is not a function`. We are trying to execute an array method on an object and hence it fails.
In order to fix the bug we need to add after the foodObj in line 74 ".meat" , like that: `foodObj.meats.forEach`.
