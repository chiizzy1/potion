# Potion Leaderboard

Potion Leaderboard is a Next.js application that displays a table of traders with various statistics and allows users to share individual trader stats as branded images.

## Design Decisions

1. **Framework**: I chose Next.js 15 with TypeScript for its robust server-side rendering capabilities, static site generation, and strong typing support.

2. **UI Components**: I utilized shadcn/ui components for a consistent and customizable design system.

3. **Styling**: Tailwind CSS was used for rapid development and easy customization.

4. **State Management**: React's built-in useState and useEffect hooks Ire used for local state management, as the application's complexity didn't warrant a more complex state management solution. I also used TanStack Query to handle states when interacting with the API.

5. **Image Generation**: I implemented client-side image generation using HTML Canvas to create shareable trader stats images without server-side dependencies.

6. **Responsive Design**: The table is designed to be responsive, with a scrollable horizontal view on smaller screens. I used TanStack Table to build a robust and responsive table.

## Assumptions

1. The API endpoint for fetching trader data is mocked and will be replaced with a real API in production.

## Testing Functionality

To test the Potion Leaderboard functionality:

1. Clone the repository and install dependencies:

   ```
   git clone https://github.com/chiizzy1/potion.git
   cd potion
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

4. Test the following features:

   - Time period filtering (Daily, Iekly, Monthly, All-Time)
   - Wallet connection simulation (Connect/Disconnect Wallet button)
   - Table sorting (click on column headers)
   - Responsive design (resize browser window)

5. Run unit tests:

   ```
   npm run test
   ```

## Deployment

### Staging Environment

1. Create a staging branch:

   ```
   git checkout -b staging
   git push origin staging
   ```

2. Set up a Vercel project for staging:

   - Connect your GitHub repository to Vercel
   - Configure the staging branch as the production branch for this project
   - Set up environment variables for staging (e.g., API endpoints)

3. Vercel will automatically deploy when changes are pushed to the staging branch

### Production Environment

1. Merge staging into main:

   ```
   git checkout main
   git merge staging
   git push origin main
   ```

2. Set up a Vercel project for production:

   - Connect your GitHub repository to Vercel
   - Configure the main branch as the production branch for this project
   - Set up environment variables for production

3. Vercel will automatically deploy when changes are pushed to the main branch

### Manual Deployment

If you prefer to deploy manually or to a different platform:

1. Build the project:

   ```
   npm run build
   ```

2. Start the production server:

   ```
   npm start
   ```

3. Deploy the `.next` folder and supporting files to your hosting platform of choice.

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
