import { LoadMoreBtn } from "./LoadMore.styled"


export const LoadMore = ({ incrementPage }) => {
    return (
        <LoadMoreBtn type="button" onClick={incrementPage}>Load more</LoadMoreBtn>
    )
}

