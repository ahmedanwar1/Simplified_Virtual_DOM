import HttpRequest from "../../framework/APIs/HttpRequest.js";
import Component from "../../framework/virtual_dom/src/Components/Component.js";
import { vNode } from "../../framework/virtual_dom/src/utils/vNode.js";
import BlogPost from "./BlogPost.js";
import EditPost from "./EditPost.js";

class BlogContainer extends Component {
  constructor() {
    super();

    this.httpRequest = new HttpRequest();
    this.state = { posts: [], editPostToggle: false };

    this.getPosts();
  }

  async getPosts() {
    const posts = await this.httpRequest.get(
      "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=30"
    );

    this.setState({ posts });
  }

  deletePost(id) {
    const newPosts = this.state.posts.filter((post) => {
      return post.id != id;
    });
    if (newPosts) {
      this.setState({ posts: newPosts });
    }
  }

  openEditPost(postData) {
    this.setState({ posts: this.state.posts, editPostToggle: true, postData });
  }
  closeEditPost() {
    this.setState({ posts: this.state.posts, editPostToggle: false });
  }

  editPost(id, modifiedValues) {
    const newPosts = this.state.posts.map((post) => {
      if (post.id == id) {
        if (modifiedValues.title.trim() != "")
          post.title = modifiedValues.title;
        if (modifiedValues.url.trim() != "") post.url = modifiedValues.url;
      }
      return post;
    });
    if (newPosts) {
      this.setState({ posts: newPosts, editPostToggle: false });
    }
  }

  generateVirtualElement() {
    // debugger;
    const posts = this.state.posts.map((post) => {
      const p = new BlogPost({
        ...post,
        deletePost: this.deletePost.bind(this),
        openEditPost: this.openEditPost.bind(this),
      }).generateVirtualElement();
      return p;
    });

    const editPost = new EditPost({
      toggle: this.state.editPostToggle,
      postData: this.state.postData,
      closeEditPost: this.closeEditPost.bind(this),
      applyChanges: this.editPost.bind(this),
    }).generateVirtualElement();

    return vNode(
      "div",
      { class: "blog-container container" },
      editPost,
      ...posts
    );
  }
}

export default BlogContainer;
