import { PhotoWrapper } from "./style";
import isURL from "validator/lib/isURL";
import no_img from "./img/no-image-icon.png";

const AvatarWrapper = <DataRow extends { url: string }>({ item }: { item: DataRow }) => {
  // Lets check if we have valid URL to img
  const imageURL = isURL(item.url) ? item.url : no_img;

  return (
    <PhotoWrapper>
      <img src={imageURL} />
    </PhotoWrapper>
  );
};

export default AvatarWrapper;
