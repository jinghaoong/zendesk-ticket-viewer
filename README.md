# Zendesk Coding Challenge Nov/Dec 2021 - Singapore

Zendesk Ticket Viewer Web Application built using ReactJS with the Material UI Framework. The app fetches Tickets from the Zendesk API and displays up to 25 per page.

## Installation and Setup

Ensure you have [NodeJS](https://nodejs.org/en/) installed (Version 16.13.0 as of writing).
The following instructions also assume that you have [Git](https://git-scm.com/downloads) installed and set-up as well.

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

## Design Choices

### ReactJS Components Breakdown
- ```Header.js```: Houses the main title and header of the application, shows 'Zendesk Ticket Viewer' in "h3" font.
- ```TicketViewer.js```: Home page of the web application, displays a 'TicketCard' for each ticket on the page and the pagination.
- ```TicketCard.js```: Displays Ticket information, shows more details on devices with larger screens (>768px).
- ```TicketDetailed.js```: Displays detailed Ticket Information in a Dialog (modal), can only be opened on smaller screens.
- ```PaginationCluster.js```: Displays a ButtonGroup containing the Buttons for reloading tickets, and navigation from page to page.
- ```Error.js```: Displays an Alert containing the error message passed via its props.

### Cursor Pagination
Main Reasons:
- Responsiveness, each page of tickets is fetched upon load.
- Realistic user scenario would involve multiple agents modifying multiple tickets.

Cons:
- Impossible to implement access to individual pages without recursively fetching all tickets, especially if there are more than 100 tickets.
- Still required to fetch tickets using Offset Pagination API endpoint to get total ticket count.
