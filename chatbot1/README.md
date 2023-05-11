# DOC Web App with Chat support

## Initial Setup:
Clone the repo and create virtual environment:

```mkdir Chat_Support
cd Chat_Support
python -m venv venv
venv/Scripts/activate.bat -- Windows
. venv/bin/activate  -- Mac/Linux
```
Install dependencies in the root folder ( 2 ways ):
```
$ (venv) pip install Flask torch torchvision nltk
```
```
pip install -r requirements.txt
```
Install nltk package
```
$ (venv) python
>>> import nltk
>>> nltk.download('punkt')
quit()
```

Run the files
```
$ (venv) python train.py
```
This will dump data.pth file. And then run
the following command to test it in the console.
```
$ (venv) python chat.py
```

## To add the chat bot to your website copy and past this code in your html file
Add this in head of the html file
```
<link rel="stylesheet" href="style.css">
```
Add this anywhere in the body of the html file
```
<div class="container">
        <div class="chatbox">
            <div class="chatbox__support">
                <div class="chatbox__header">
                    <div class="chatbox__image--header">
                        <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image">
                    </div>
                    <div class="chatbox__content--header">
                        <h4 class="chatbox__heading--header">Chat support</h4>
                        <p class="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                    </div>
                </div>
                <div class="chatbox__messages">
                    <div></div>
                </div>
                <div class="chatbox__footer">
                    <input type="text" placeholder="Write a message...">
                    <button class="chatbox__send--footer send__button">Send</button>
                </div>
            </div>
            <div class="chatbox__button">
                <button><img src="./images/chatbox-icon.svg" /></button>
            </div>
        </div>
    </div>
    
        <script src="./app.js"></script>
```
