import { useQuery } from '@apollo/client'
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { All_AUTHORS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const result_all_authors = useQuery(All_AUTHORS);


  if(result_all_authors.loading){
    return <div>loading...</div>;
  }

  console.log('result', result_all_authors.data);
  

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors = {result_all_authors.data.allAuthors} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
