import React from 'react';
import {gql, useSubscription} from '@apollo/client';

const USERS_SUBSCRIPTION = gql`
    subscription OnUserUpdate($userId: ID!) {
        userUpdated(userId: $userId) {
            id
            name
            friends {
                id
                name
            }
        }
    }
`;

interface Friend {
    id: string;
    name: string;
}

interface UserUpdateData {
    userUpdated: {
        id: string;
        name: string;
        friends: Friend[];
    };
}

interface UserUpdateVars {
    userId: string;
}

interface UsersSubscriptionProps {
    userId: string;
}

const UsersSubscription: React.FC<UsersSubscriptionProps> = ({userId}) => {
    const {data, loading, error} = useSubscription<UserUpdateData, UserUpdateVars>(
        USERS_SUBSCRIPTION,
        {variables: {userId}}
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! {error.message}</div>;

    return (
        <div>
            <h2>User Updated: {data?.userUpdated.name}</h2>
            <h3>Friends:</h3>
            <ul>
                {data?.userUpdated.friends.map(friend => (
                    <li key={friend.id}>{friend.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersSubscription;
