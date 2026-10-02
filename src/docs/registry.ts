// Importing a file runs its registrations; the folders here match the
// folders in the docs sidebar.
import "./registry/system";
import "./registry/catalogue/books";
import "./registry/catalogue/authors";
import "./registry/orders/orders";

export { registry } from "./registry/register";
