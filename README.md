# Real Time Chat Application
A real time chat application using NodeJS/Express/Socker.io/AngularJS.

Steps to run application:
* Clone the repository and cd into it
* Run `npm install` in terminal
* Done!

How to run application:
* cd into the repository
* Run `node index.js host port`
* **NOTE** : replace *host* -> localhost/your_ip_address
* **NOTE** : replace *port* -> 8000/your_desired_port
* Terminal will return you the URL, open that in a browser
* **NOTE** : *Once you open the webpage, it'll ask you for your name. Please add your name WITHOUT SPACE.*
* Enjoy!

Features:
* One to one chat
* Group chat (default group created)
* `typing...` and `New Message` notification

Limitations:
* You cannot send message without first selecting message recipient
* You won't receive `typing...` and `New Message` if your chat window is already focused to that recipient
* New member will automatically get displayed and left members will be removed

Thank you...!!!
