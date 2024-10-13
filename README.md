shopify-ai-analytics-frontend


Chat Application with AI Assistant
This is a chat application that integrates an AI Assistant to provide responses to user queries. The frontend is built with React, and it interacts with a backend API to fetch AI-generated insights based on user input.

Features
User-initiated Chat: Users can send text messages, and the AI responds with relevant insights.
AI Integration: Fetches answers using an AI API (e.g., from a Django backend) based on the user's input.
Loading Indicator: Displays when the AI is processing a response.
Responsive UI: Chat interface adapts to various screen sizes.
Tech Stack
Frontend
React: For building the user interface.
TypeScript: Ensures type safety in the application.
CSS: Inline styles for component-specific styling.
Backend
Django (Optional): Example backend API used for fetching AI insights.
Fetch API: Used to make API requests to the backend.
Installation and Setup
Prerequisites
Node.js (v14 or higher)
npm or yarn package manager
Steps to Run the Application
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/chat-application-ai.git
cd chat-application-ai
Install Dependencies:

bash
Copy code
npm install
or

bash
Copy code
yarn install
Start the Development Server:

bash
Copy code
npm start
or

bash
Copy code
yarn start
Backend Setup (Optional):

If you're using Django as a backend, ensure your API endpoint is running at http://127.0.0.1:8000/ai/get_insights/.
You can modify the API URL in the Chat component if needed.
Environment Variables
Ensure that the backend API URL is correctly set in the frontend. Modify the following section in the Chat component:

typescript
Copy code
const response = await fetch(`http://127.0.0.1:8000/ai/get_insights/?query=${encodedQuery}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});
Usage
Type your question in the input box.
Press "Enter" or click "Send" to send your message.
The AI Assistant will respond with relevant insights.
If there is a delay, a loading indicator will show that the AI is typing.
