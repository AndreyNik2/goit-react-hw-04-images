import { LoadMoreBtn } from "./LoadMore.styled"


export const LoadMore = ({ loadMoreProp }) => {
  return (
    <LoadMoreBtn type="button" onClick={loadMoreProp}>
      Load more
    </LoadMoreBtn>
  );
};

