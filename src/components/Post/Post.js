import { gql, useMutation } from '@apollo/client';
import React from 'react';
import './Post.css';

const PUBLISH_POST = gql`
    mutation PublishPost($postId: ID!) {
        postPublish(postId: $postId) {
            userErrors {
                message
            }
            post {
                title
            }
        }
    }
`;

const UNPUBLISH_POST = gql`
    mutation UnpublishPost($postId: ID!) {
        postUnpublish(postId: $postId) {
            userErrors {
                message
            }
            post {
                title
            }
        }
    }
`;

export default function Post({
    title,
    content,
    date,
    user,
    published,
    id,
    isMyProfile,
}) {
    // eslint-disable-next-line no-unused-vars
    const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
    // eslint-disable-next-line no-unused-vars
    const [unpublishPost, { data: unpublishData, loading: unpublishLoading }] =
        useMutation(UNPUBLISH_POST);
    const formatedDate = new Date(Number(date));

    return (
        <div
            className="Post"
            style={published === false ? { backgroundColor: 'hotpink' } : {}}
        >
            {isMyProfile && published === false && (
                <p
                    className="Post__publish"
                    onClick={() =>
                        publishPost({
                            variables: {
                                postId: id,
                            },
                        })
                    }
                >
                    publish
                </p>
            )}
            {isMyProfile && published === true && (
                <p
                    className="Post__publish"
                    onClick={() =>
                        unpublishPost({
                            variables: {
                                postId: id,
                            },
                        })
                    }
                >
                    unpublish
                </p>
            )}
            <div className="Post__header-container">
                <h2>{title}</h2>
                <h4>
                    Created At{' '}
                    {`${formatedDate}`.split(' ').splice(0, 3).join(' ')} by{' '}
                    {user}
                </h4>
            </div>
            <p>{content}</p>
        </div>
    );
}
