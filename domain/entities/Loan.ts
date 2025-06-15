import { Book } from "./Book";
import { User } from "./User";

export interface Loan {
  book: Book;
  user: User;
}
