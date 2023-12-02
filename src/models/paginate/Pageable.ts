import { Sort } from "./Sort";

// response JSON of org.springframework.data.domain.Pageable

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
