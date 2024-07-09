const Persons = ({ persons, strFilter }) => {
    //obtiene una lista de personas que contienen el filtro por nombre
    const personsFilter = persons.filter(p => p.name.toLowerCase().includes(strFilter.toLowerCase()));
    //console.log(personsFilter);
    return(
        <div>
            {personsFilter.map(p => <li key={p.id}>{p.name}: {p.number}</li>)}
        </div>
    )
  }
  
  export default Persons