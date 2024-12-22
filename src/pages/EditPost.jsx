import React, { useEffect, useState } from 'react';
import CreatePost from '../component/Post/CreatePost';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById } from '../store/postSlice';
import { useDispatch } from 'react-redux';
import Container from '../component/ExtraComp/Container';

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useParams();

  useEffect(() => {
    if (_id) {
      dispatch(fetchPostById(_id)).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate('/home');
    }
  }, [_id, dispatch, navigate]);

  return post ? (
    <Container>
      <div>
        <CreatePost post={post} />
      </div>
    </Container>
  ) : null;
}

export default EditPost;
