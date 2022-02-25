import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import pic from "../img/Blog-Image.png";
import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/posts/";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(baseUrl);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  // Function to Delete the Post {However it is not possible to delete because the api is static}
  const deletePost = (id, e) => {
    console.log(e);
    e.preventDefault();
    axios.delete(`baseUrl${id}`).then((response) => {
      console.log(response);
      alert("Blog Deleted !!!");
      // setPosts(response.data);
    });
  };

  // Get Current Posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(3).fill().map((_, idx) => start + idx + 1);
  };
  // Pagination
  const Pagination = () => {
    const [pages] = useState(Math.round(posts.length / postPerPage));
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(100 / postPerPage); i++) {
      pageNumbers.push(i);
    }

    function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
    }

    // Function for Previous Page
    function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
    }

    //Function for Next Page

    function goToNextPage() {
      setCurrentPage((page) => page + 1);
    }
    return (
      <>
        <ul className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
          </button>
          {getPaginationGroup().map((item, index) => (
            <li key={item} className="page-item">
              <a
                onClick={(event) => changePage(event)}
                href="/#"
                className={`page-link ${
                  currentPage === item ? "active" : null
                }`}
              >
                {item}
              </a>
            </li>
          ))}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? "disabled" : ""}`}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
          </button>
        </ul>
      </>
    );
  };

  //  Set the number of words of Title and Description according to List and Grid view
  if (props.Grid) {
    var blogTitle = 80;
    var blogDesc = 150;
  } else {
    blogTitle = 15;
    blogDesc = 55;
  }

  
  return (
    <div className={props.sidebar ? "Blog-Body active" : "Blog-Body "}>
      <div className={props.Grid ? "Main-Content " : "Main-Content active"}>
        {currentPosts.map((post, id) => (
          <Card key={id} className={props.Grid ? "card" : "card active"}>
            <Card.Body
              className={props.Grid ? "Single-blog" : "Single-blog active"}
            >
              <div className="content">
                <h5>{post.title.slice(0, blogTitle)}...</h5>
                <p>{post.body.slice(0, blogDesc)}...</p>
              </div>
              <img
                className={props.Grid ? "blog-image" : "blog-image active"}
                src={pic}
                alt=""
              />
              <i
                onClick={(e) => {
                  deletePost(post.id, e);
                }}
                className={
                  props.Grid ? "fa fa-times-circle" : "fa fa-times active"
                }
                aria-hidden="true"
              ></i>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Posts;
