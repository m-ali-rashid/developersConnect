import React, { Fragment, useEffect } from "react";
import {NavLink} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
// import PostForm from "./PostForm";
import Spinner from "../layout/Spinner";

const Posts = ({auth, getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className="my-2 py-1"></div>
      <p className="lead text-primary">
        <i className="fas fa-user"></i> Welcome to the Community
      </p>

      {auth.isAuthenticated && !auth.loading && auth.user._id ? (
        <NavLink to='/createPost' className="btn btn-primary">Create New Post</NavLink>
      ):(<p className="lead text-white">Please Login or Signup to Create or comment on Posts</p>)}

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);
