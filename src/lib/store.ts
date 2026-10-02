import type { Author, Book, Order } from "./schemas";

// An in-memory store so the demo needs no database. On Vercel each serverless
// instance holds its own copy, so writes are real but do not persist.

export const authors: Author[] = [
  { id: "auth_chinua", name: "Chinua Achebe", country: "Nigeria" },
  { id: "auth_chimamanda", name: "Chimamanda Ngozi Adichie", country: "Nigeria" },
  { id: "auth_ngugi", name: "Ngũgĩ wa Thiong'o", country: "Kenya" },
];

export const books: Book[] = [
  { id: "book_things_fall_apart", title: "Things Fall Apart", authorId: "auth_chinua", genre: "fiction", priceNaira: 8500, inStock: 12 },
  { id: "book_arrow_of_god", title: "Arrow of God", authorId: "auth_chinua", genre: "fiction", priceNaira: 9000, inStock: 4 },
  { id: "book_half_of_a_yellow_sun", title: "Half of a Yellow Sun", authorId: "auth_chimamanda", genre: "fiction", priceNaira: 12000, inStock: 7 },
  { id: "book_we_should_all_be_feminists", title: "We Should All Be Feminists", authorId: "auth_chimamanda", genre: "non-fiction", priceNaira: 6000, inStock: 20 },
  { id: "book_decolonising_the_mind", title: "Decolonising the Mind", authorId: "auth_ngugi", genre: "non-fiction", priceNaira: 10500, inStock: 0 },
];

export const orders: Order[] = [];
