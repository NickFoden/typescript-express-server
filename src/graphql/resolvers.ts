const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: 1925,
    genre: "Literary Fiction"
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    publishedYear: 1949,
    genre: "Science Fiction"
  }
]; 

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    books: () => books,
    book: (_: any, { id }: { id: string }) => {
      return books.find(book => book.id === id);
    }
  }
}; 