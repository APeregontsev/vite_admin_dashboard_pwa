import { FC } from "react";
import { AgendaBlockWrapper } from "./style";
import { useAppSelector } from "store/store";
import RenderCollection from "common/ErrorsHandling/RenderCollection";
import { AgendaItem } from "./AgendaItem/AgendaItem";

type AgendaBlockProps = {};

const AgendaBlock: FC<AgendaBlockProps> = ({}) => {
  const todos = useAppSelector((state) => state.data.todos);
  const posts = useAppSelector((state) => state.data.posts);
  const photos = useAppSelector((state) => state.data.photos);
  const comments = useAppSelector((state) => state.data.comments);
  const albums = useAppSelector((state) => state.data.albums);

  // Lets prepare data for agenda blocks -> must be 5 blocks

  const totalTodos = todos.length;
  const totalPosts = posts.length;
  const totalPhotos = photos.length;
  const totalComments = comments.length;
  const totalAlbums = albums.length;

  const agendaData = [
    { name: "Todos", value: totalTodos },
    { name: "Photos", value: totalPhotos },
    { name: "Posts", value: totalPosts },
    { name: "Comments", value: totalComments },
    { name: "Albums", value: totalAlbums },
  ];

  return (
    <AgendaBlockWrapper>
      <RenderCollection collection={agendaData} Component={AgendaItem} />
    </AgendaBlockWrapper>
  );
};

export default AgendaBlock;
