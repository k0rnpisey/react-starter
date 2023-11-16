import React from 'react';
import UsersSubscription from './UsersSubscription';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import {__DEV__} from "@apollo/client/utilities/globals";

if (__DEV__) {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
}

const App: React.FC = () => {
    return (
        <div>
            <h1>User's Friends Updates</h1>
            {/* Pass the user ID to the UsersSubscription component */}
            <UsersSubscription userId="1" />
        </div>
    );
};

export default App;