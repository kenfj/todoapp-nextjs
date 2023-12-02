import { Pageable } from "./Pageable";
import { Sort } from "./Sort";

// response JSON of org.springframework.data.domain.Page

export type Page<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
