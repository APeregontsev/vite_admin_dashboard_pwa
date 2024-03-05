import { FC } from "react";
import { HeaderWrapper } from "./style";
import { useAppSelector } from "store/store";
import RenderCollection from "common/ErrorsHandling/RenderCollection";
import { HeaderItem } from "./HeaderItem/HeaderItem";

type HeaderProps = {};

const HeaderOverview: FC<HeaderProps> = ({}) => {
  const todos = useAppSelector((state) => state.data.todos);
  const posts = useAppSelector((state) => state.data.posts);

  // Lets prepare data for header blocks -> must be 4 blocks
  const completedTodos = todos.reduce((acc, todo) => (todo.completed ? ++acc : acc), 0);
  const inProgressTodos = todos.reduce((acc, todo) => (todo.completed ? acc : ++acc), 0);
  const totalTodos = todos.length;
  const totalPosts = posts.length;

  const headerData = [
    { name: "Completed", value: completedTodos },
    { name: "In progress", value: inProgressTodos },
    { name: "Total todos", value: totalTodos },
    { name: "Total posts", value: totalPosts },
  ];

  return (
    <HeaderWrapper>
      <RenderCollection collection={headerData} Component={HeaderItem} />
    </HeaderWrapper>
  );
};

export default HeaderOverview;
