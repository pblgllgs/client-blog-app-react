import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Post from '../../components/Post/Post';

const GET_POST = gql`
    query {
        posts {
            id
            title
            content
            createdAt
            user {
                name
                email
            }
        }
    }
`;

export default function Posts() {
    const { data, error, loading } = useQuery(GET_POST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const { posts } = data;

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    date={post.createdAt}
                    id={post.id}
                    user= {post.user.name}
                />
            ))}
        </div>
    );
}
