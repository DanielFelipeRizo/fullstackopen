import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach, expect } from "vitest";

describe("<Blog/>", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "test title",
      author: "dfr11",
      url: "www.s.com",
      likes: 5,
      user: "66d3b85b6bf3f43b36780b3c",
    };

    container = render(<Blog blog={blog} />).container;
  });

  test("renders the content without the div details", () => {
    const divBlog = container.querySelector(".blog");
    expect(divBlog).not.toHaveStyle("display: none");
    screen.getByText("title: test title, author: dfr11");

    const divBlogDetails = container.querySelector(".blogDetails");
    expect(divBlogDetails).toHaveStyle("display: none");
  });

  test("verify button showing blog details", async () => {
    //antes de dar clic
    const divBlogDetails = container.querySelector(".blogDetails");
    expect(divBlogDetails).toHaveStyle("display: none");

    //simular accion de dar clic
    const user = userEvent.setup();
    const button = container.querySelector("#buttonDetailsVisibility");
    await user.click(button);

    expect(divBlogDetails).not.toHaveStyle("display: none");
  });

  test("verify call to the Likes button event handler twice", async () => {
    const blog = {
      title: "test title",
      author: "dfr11",
      url: "www.s.com",
      likes: 5,
      user: "66d3b85b6bf3f43b36780b3c",
    };

    const mockAddLike = vi.fn();

    const container1 = render(
      <Blog blog={blog} handleUpdateLikesBlog={mockAddLike} />,
    ).container;

    const user = userEvent.setup();
    const button = container1.querySelector("#buttonAddLikes");

    await user.click(button);
    await user.click(button);

    expect(mockAddLike.mock.calls).toHaveLength(2);
  });
});
