import "./BlogForm.scss";
import { useState } from "react";
import {
  addBlog,
  getBlogs,
  updateBlog,
} from "../../../features/blogs/serviceApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

type Props = {
  slug: string;
  setOpen: (open: boolean) => void;
  item: any;
};

const BlogForm = ({ setOpen, slug, item }: Props) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    author_name: item?.author_name || "",
    author_designation: item?.author_designation || "",
    author_img: null,
    title: item?.title || "",
    description: item?.description || "",
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("author_name", formData.author_name);
    formDataToSend.append("author_designation", formData.author_designation);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (formData.author_img) {
      formDataToSend.append("author_img", formData.author_img);
    }
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (item) {
        await updateBlog(dispatch, item._id, formDataToSend);
        Swal.fire("Updated!", "Blog has been updated.", "success");
      } else {
        await addBlog(dispatch, formDataToSend);
        Swal.fire("Added!", "Blog has been added.", "success");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        `${item ? "Failed to update" : "Failed to add"} the blog.`,
        "error"
      );
    }

    await getBlogs(dispatch);
    setOpen(false);
  };

  return (
    <div className="blog-form">
      <h3>{item ? `Update ${slug}` : `Create ${slug}`}</h3>
      <form onSubmit={handleSubmit}>
        <div className="blog-form-wrapper">
          <div className="item">
            <label>Author</label>
            <input
              type="text"
              name="author_name"
              placeholder="Author name"
              value={formData.author_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Author Designation</label>
            <input
              type="text"
              name="author_designation"
              placeholder="Author designation"
              value={formData.author_designation}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Author Image</label>
            <input type="file" name="author_img" onChange={handleInputChange} />
          </div>
          <div className="item">
            <label>Thumbnail</label>
            <input type="file" name="image" onChange={handleInputChange} />
          </div>
          <div className="item">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Blog title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="blog-description">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Write a compelling description for your blog..."
            rows={5}
          />
        </div>
        <button type="submit">{item ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default BlogForm;
