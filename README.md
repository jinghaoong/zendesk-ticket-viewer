# Zendesk Coding Challenge Nov/Dec 2021 - Singapore

Zendesk Ticket Viewer Web Application built using ReactJS with the Material UI Framework. The app fetches Tickets from the Zendesk API and displays them either:
- in full on devices with larger screens or
- in summarised form with the option of opening a detailed view modal on devices with small screens (768px<)

## Installation and Setup

Ensure you have [NodeJS](https://nodejs.org/en/) installed (Version 16.13.0 as of writing).

1. Download the repository by running this commmand in your terminal/cmd when in your folder of choice.
```
$ git clone https://github.com/jinghaoong/zendesk-ticket-viewer.git
```

2. Navigate into the project folder.
```
$ cd zendesk-ticket-viewer/
```

3. Install all required Node modules with the following command.
```
$ npm install
```

4. Create a ```.env``` file in the ```src``` folder with the following Environment Variable names and replace the values with your OAuth 2.0 Token and Zendesk Domain URL.
```
REACT_APP_TOKEN={OAuth2.0_Token}
REACT_APP_ZCC_URL={Zendesk_Domain_URL}
```

## Usage
Run the program with the following command and view the app in your browser at [http://localhost:3000](http://localhost:3000).
```
$ npm start
```

## Running Tests
Navigate to the project folder and run the following command in terminal/cmd.
```
$ npm test
```
