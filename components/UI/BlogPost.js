import Component from "../../framework/virtual_dom/src/Components/Component.js";
import { vNode } from "../../framework/virtual_dom/src/utils/vNode.js";

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  delete(id) {
    this.props.deletePost(id);
  }

  generateVirtualElement() {
    // debugger;
    const handleDeletion = () => {
      this.delete(this.props.id);
    };

    return vNode(
      "div",
      { class: "post" },
      vNode("p", { class: "id-label" }, this.props.id),
      vNode("img", { src: this.props.url, height: 100 }),
      vNode("h2", {}, this.props.title),
      vNode(
        "button",
        {
          on: {
            click: () =>
              this.props.openEditPost({
                id: this.props.id,
                title: this.props.title,
                url: this.props.url,
              }),
          },
        },
        "Edit"
      ),
      vNode(
        "button",
        {
          on: {
            click: () => handleDeletion(),
          },
        },
        "Delete"
      )
    );
  }
}

export default BlogPost;
