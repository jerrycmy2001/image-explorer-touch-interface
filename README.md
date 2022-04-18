# image-explorer-touch-interface

## About The Project
This project provides an interactive interface for [ImageExplorer](https://guoanhong.com/papers/CHI22-ImageExplorer.pdf), where blind people could explore details of images by moving their hand on the screen. 

## Getting Started
### Prerequisites
Set up the [React Native environment](https://reactnative.dev/docs/environment-setup).

### Installation
1. Clone the repo
    ```
    git clone https://github.com/jerrycmy2001/image-explorer-touch-interface
    cd image-explorer-touch-interface
    ```

2. Install dependencies
    ```
    npm install
    ```

3. Start the app

    ```
    npm start
    ```
    If your app does not start due to Internect connection, you could try
    ```
    npm install @expo/ngrok@4.1.0
    expo start --tunnel
    ```


## Features
The app supports the following features:
1. Users can choose this image from a list.
2. Once selected, it’ll show the UI as Figure Information Layer 1. The first information layer shows primary objects in the image outlined with polygonal boundaries.
3. The user can move their finger around on the image, once their finger enters an object, it’ll read its name.

    a) If the user’s finger stays inside the same object, it’ll repeat reading its name every 3 seconds

    b) If the user’s finger is moving outside of any object, play a continuous background

4. After double tapping on an object, users enter the second information layer, which shows rectangular bounding boxes around various detailed sub-objects. After exploring an object in detail, users can double tap anywhere to exit the second layer.

5. After double tapping on the background in the first layer, user can go back to the list and select another image. 
