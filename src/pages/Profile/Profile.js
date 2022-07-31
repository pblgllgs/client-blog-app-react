import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import AddPostModal from '../../components/AddPostModal/AddPostModal';
import Post from '../../components/Post/Post';

export default function Profile() {
    const GET_PROFILE = gql`
        query GetProfile($userId: ID!) {
            profile(userId: $userId) {
                bio
                isMyProfile
                user {
                    id
                    name
                    posts {
                        id
                        title
                        content
                        createdAt
                        published
                    }
                }
            }
        }
    `;
    const { id } = useParams();
    const { data, error, loading } = useQuery(GET_PROFILE, {
        variables: { userId: id },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { profile } = data;
    console.log(profile)
    return (
        <div>
            <div
                style={{
                    marginBottom: '2rem',
                    display: 'flex ',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <h1>{profile.user.name}</h1>
                    <p>{profile.bio}</p>
                </div>
                <div>{profile.isMyProfile ? <AddPostModal /> : null}</div>
            </div>
            <div>
                {profile.user.posts.map((post) => (
                    <Post
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        date={post.createdAt}
                        id={post.id}
                        user= {profile.user.name}
                        published={post.published}
                        isMyProfile={profile.isMyProfile}
                    />
                ))}
            </div>
        </div>
    );
}
